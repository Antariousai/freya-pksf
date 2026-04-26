# Antarious Deployment Guide

This guide documents the production deployment flow for the Antarious static site on Ubuntu with Nginx, Git-based deployment, and Let's Encrypt SSL.

## Deployment Target

- Server user: `foysal`
- App directory: `/home/foysal/antarious`
- Domain: `antarious.com`
- Optional alias: `www.antarious.com`
- Web server: `nginx`
- SSL: `certbot`

## Assumptions

- Ubuntu server is already provisioned.
- User `foysal` already exists and has `sudo` access.
- `nginx` is installed.
- `certbot` is installed.
- DNS for `antarious.com` is already pointed to the server.
- The site is a static site with `index.html` at the repo root.

## 1. Git Deployment Access

If the repository is private, use a dedicated GitHub deploy key for this repository.

Generate a new deploy key as `foysal`:

```bash
sudo -u foysal ssh-keygen -t ed25519 -f /home/foysal/.ssh/antarious_deploy_key -C "deploy-antarious"
sudo -u foysal cat /home/foysal/.ssh/antarious_deploy_key.pub
```

Add the public key to GitHub:

- Repository: `foysal-mahmud-hasan/antarious`
- Location: `Settings > Deploy keys`
- Title: `antarious-production`
- Paste the contents of `/home/foysal/.ssh/antarious_deploy_key.pub`
- Keep write access disabled unless the server must push changes

### SSH Config

If `~/.ssh/config` already contains other deploy keys, add a separate host alias for Antarious.

Edit:

```bash
sudo nano /home/foysal/.ssh/config
```

Example:

```sshconfig
Host github-adeospace
    HostName github.com
    User git
    IdentityFile /home/foysal/.ssh/adeospace_deploy
    IdentitiesOnly yes

Host github-antarious
    HostName github.com
    User git
    IdentityFile /home/foysal/.ssh/antarious_deploy_key
    IdentitiesOnly yes
```

Set permissions:

```bash
sudo chown -R foysal:foysal /home/foysal/.ssh
sudo chmod 700 /home/foysal/.ssh
sudo chmod 600 /home/foysal/.ssh/config /home/foysal/.ssh/antarious_deploy_key
sudo chmod 644 /home/foysal/.ssh/antarious_deploy_key.pub
sudo -u foysal ssh-keyscan github.com >> /home/foysal/.ssh/known_hosts
sudo chown foysal:foysal /home/foysal/.ssh/known_hosts
```

Test SSH access:

```bash
sudo -u foysal ssh -T github-antarious
```

## 2. Clone the Repository

Clone the project into the production directory:

```bash
sudo -u foysal git clone git@github-antarious:foysal-mahmud-hasan/antarious.git /home/foysal/antarious
```

If the repository is public, HTTPS clone also works:

```bash
sudo -u foysal git clone https://github.com/foysal-mahmud-hasan/antarious.git /home/foysal/antarious
```

## 3. Set File Permissions

Allow Nginx to read the site files:

```bash
sudo chown -R foysal:www-data /home/foysal/antarious
sudo find /home/foysal/antarious -type d -exec chmod 755 {} \;
sudo find /home/foysal/antarious -type f -exec chmod 644 {} \;
sudo chmod 755 /home/foysal
```

## 4. Create the Nginx Server Block

Create the site config:

```bash
sudo nano /etc/nginx/sites-available/antarious.com
```

Add:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name antarious.com www.antarious.com;

    root /home/foysal/antarious;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/antarious.com /etc/nginx/sites-enabled/antarious.com
sudo nginx -t
sudo systemctl reload nginx
```

## 5. About the Default Nginx Site

Do not remove `/etc/nginx/sites-enabled/default` blindly.

On some servers, the default site is harmless. On others, it may be intentionally used for another app or fallback behavior.

Inspect enabled sites first:

```bash
ls -l /etc/nginx/sites-enabled/
sudo nginx -T | grep -n "server_name"
```

If `default` is only the stock Ubuntu welcome site and you do not need it, disable the symlink safely:

```bash
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

If it is being used for anything important, leave it in place.

## 6. Firewall

If UFW is enabled:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## 7. Install the SSL Certificate

Request and install the certificate with Certbot:

```bash
sudo certbot --nginx -d antarious.com -d www.antarious.com
```

When prompted, choose the option to redirect HTTP to HTTPS.

## 8. Final Nginx Block After SSL

Certbot usually updates the server block automatically. A complete final version should look similar to this:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name antarious.com www.antarious.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name antarious.com www.antarious.com;

    root /home/foysal/antarious;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/antarious.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/antarious.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }
}
```

Validate and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Verify the Deployment

Check:

```bash
sudo systemctl status nginx --no-pager
sudo certbot renew --dry-run
```

Then open:

- `http://antarious.com`
- `https://antarious.com`
- `https://www.antarious.com`

## 10. Updating the Site

To pull the latest code:

```bash
sudo -u foysal git -C /home/foysal/antarious pull origin main
sudo systemctl reload nginx
```

## 11. Common Problems

### SSH says it cannot resolve `github-antarious`

Cause:

- The alias does not exist in `/home/foysal/.ssh/config`

Fix:

- Add a `Host github-antarious` entry to the SSH config
- Retry `sudo -u foysal ssh -T github-antarious`

### Git says permission denied

Cause:

- The deploy key is not added to the correct repository
- The wrong SSH alias is being used
- File permissions in `/home/foysal/.ssh` are too open

Fix:

- Confirm the public key is added under the Antarious repository deploy keys
- Confirm the clone URL uses `git@github-antarious:foysal-mahmud-hasan/antarious.git`
- Re-apply the SSH permission commands from this guide

### Nginx serves 403 or cannot read files

Cause:

- Nginx cannot traverse `/home/foysal`
- File permissions are incorrect

Fix:

```bash
sudo chmod 755 /home/foysal
sudo chown -R foysal:www-data /home/foysal/antarious
sudo find /home/foysal/antarious -type d -exec chmod 755 {} \;
sudo find /home/foysal/antarious -type f -exec chmod 644 {} \;
```

### `nginx -t` fails

Check the exact error:

```bash
sudo nginx -t
```

Common causes:

- syntax error in the server block
- duplicate `server_name`
- broken symlink in `sites-enabled`

