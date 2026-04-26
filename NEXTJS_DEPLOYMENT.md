# Deploying antarious-next to Production

Replaces the legacy static HTML site at `antarious.com` with the Next.js app at `/home/foysal/antarious/antarious-next/`.

---

## Overview

| | Legacy | Next.js |
|---|---|---|
| Type | Static HTML | Node.js (Next.js) |
| Nginx role | Serve files directly | Reverse proxy to port 3001 |
| Process manager | None | PM2 |

---

## Port allocation on this server

Each app must run on its own internal port. Nginx routes by domain, so port numbers are invisible to visitors.

| Port | App |
|------|-----|
| 3000 | uvicorn / Python FastAPI (existing) |
| 3001 | antarious-next |

Add future apps on 3002, 3003, etc.

**Quick check — see what is running on any port:**

```bash
lsof -i :3000
lsof -i :3001
```

---

## Prerequisites

Confirm PM2 is installed:

```bash
pm2 --version
```

If missing:

```bash
npm install -g pm2
```

---

## Step 1 — SSH into the server

```bash
ssh root@your-server-ip
# or
ssh foysal@your-server-ip
```

---

## Step 2 — Navigate to the app

```bash
cd /home/foysal/antarious/antarious-next
```

---

## Step 3 — Install dependencies

```bash
npm install
```

---

## Step 4 — Build the app

```bash
npm run build
```

The build only runs `next build` — the prebuild hooks that required the legacy HTML files have been removed. The content is already baked into `data/html/*.js` and does not need to be regenerated.

A successful build produces a `.next/` folder.

---

## Step 5 — Check for port conflicts before starting

**Important:** Always check that port 3001 is free before starting. If something else is already on 3001 the start will fail.

```bash
lsof -i :3001
```

If a process appears, kill it:

```bash
fuser -k 3001/tcp
```

Wait a few seconds, then verify it is gone:

```bash
lsof -i :3001
# should return nothing
```

---

## Step 6 — Check for existing PM2 processes

**Important:** If you have run the PM2 start command before, a duplicate process will be created. Always check first:

```bash
pm2 status
```

If `antarious-next` already appears in the list, delete it before starting again:

```bash
pm2 delete antarious-next
# or by id:
pm2 delete 0
```

Confirm the list is clean:

```bash
pm2 status
# antarious-next should not appear
```

---

## Step 7 — Start the app with PM2

```bash
pm2 start npx --name "antarious-next" -- next start -p 3001
```

Note: `next` is not available globally — the command uses `npx` to run the local binary. Do not use `npm start` for PM2; pass the flags through `npx` as shown above.

Verify it started cleanly:

```bash
pm2 status
# antarious-next should show status: online, restarts: 0
```

Check the logs to confirm the server is listening:

```bash
pm2 logs antarious-next --lines 30
# look for: started server on port 3001
```

Confirm the app is responding:

```bash
curl -I http://localhost:3001
# expected: HTTP/1.1 200 OK
```

---

## Step 8 — Persist PM2 across reboots

```bash
pm2 startup
```

This prints a command. Copy and run that command exactly as printed (it will look like `sudo env PATH=...`). Then:

```bash
pm2 save
```

---

## Step 9 — Back up the current Nginx config

Do this before making any changes — it is your rollback:

```bash
cp /etc/nginx/sites-available/antarious.com /etc/nginx/sites-available/antarious.com.legacy.bak
```

---

## Step 10 — Update the Nginx server block

```bash
nano /etc/nginx/sites-available/antarious.com
```

Replace the entire file contents with the following. The SSL certificates and HTTP→HTTPS redirect blocks are kept — only the main `server` block changes from static files to a proxy:

```nginx
server {
    server_name antarious.com www.antarious.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Next.js static assets are content-hashed — safe to cache for 1 year
    location /_next/static/ {
        proxy_pass http://localhost:3001/_next/static/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Public folder assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)$ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/antarious.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/antarious.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.antarious.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = antarious.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;
    server_name antarious.com www.antarious.com;
    return 404; # managed by Certbot
}
```

---

## Step 11 — Test and reload Nginx

```bash
nginx -t
```

If the config test passes:

```bash
systemctl reload nginx
```

---

## Step 12 — Verify the live site

```bash
curl -I https://antarious.com
```

Expected response — these headers confirm Next.js is serving (not static files):

```
HTTP/2 200
server: nginx/1.24.0 (Ubuntu)
content-type: text/html; charset=utf-8
# No ETag, no Accept-Ranges, no Last-Modified — those are static file headers
```

Open the site in a browser and check a few pages including redirects from old `.html` URLs:

```
https://antarious.com/business        ← Next.js route
https://antarious.com/business.html   ← should redirect 301 to /business
```

---

## Rollback plan

If anything goes wrong, revert to the legacy static site in under a minute:

```bash
# 1. Stop the Next.js process
pm2 stop antarious-next

# 2. Restore the Nginx backup
cp /etc/nginx/sites-available/antarious.com.legacy.bak /etc/nginx/sites-available/antarious.com
systemctl reload nginx
```

---

## Ongoing workflow

### Deploying content updates

Content lives in `data/html/*.js`. To update a page:

```bash
cd /home/foysal/antarious/antarious-next

# Edit the page content
nano data/html/business.js

# Rebuild and restart
npm run build
pm2 restart antarious-next
```

### Deploying code/dependency updates

```bash
cd /home/foysal/antarious/antarious-next
npm install        # only needed if package.json changed
npm run build
pm2 restart antarious-next
```

### PM2 commands

```bash
pm2 status                          # see all running processes
pm2 logs antarious-next             # live log stream
pm2 logs antarious-next --lines 100 # last 100 lines
pm2 restart antarious-next          # restart after rebuild
pm2 stop antarious-next             # stop without removing
pm2 delete antarious-next           # remove from PM2 list
pm2 monit                           # interactive process monitor
```

---

## Responsive and motion release checklist

Run this checklist before each production release that changes page layout, CSS, or interactive behavior.

### Viewport matrix checks

- iPhone SE (`375x667`)
- iPhone 12 (`390x844`)
- iPhone 15 (`393x852`)
- iPad (`768x1024`)
- Desktop (`1366x768`)
- Desktop (`1920x1080`)

Validate at least these routes:

- `/`
- `/business`
- `/government`
- `/freya`

### Visual quality checks

- Brand palette is consistent across nav, cards, buttons, and footer.
- No horizontal overflow at any tested viewport.
- Headline/body typography remains readable on small screens.
- CTA tap targets remain usable (minimum touch-friendly sizing).

### Motion and accessibility checks

- Hover/focus transitions remain consistent.
- Heavy decorative animations are reduced on small screens.
- `prefers-reduced-motion` disables non-essential animation.
- Demo modal opens/closes smoothly and remains usable on mobile width.

### Performance checks

Use Lighthouse (desktop and mobile presets) against production-like pages:

```bash
npx --yes lighthouse "https://antarious.com/" --preset=desktop --output=html --output-path=lh-home-desktop.html
npx --yes lighthouse "https://antarious.com/" --preset=perf --output=html --output-path=lh-home-mobile.html
```

Monitor these metrics for regressions:

- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

### Rollback trigger

If release introduces major responsive regressions (navigation clipping, unreadable hero copy, broken CTA flow, or severe animation jank), run rollback steps immediately from the rollback section above.
