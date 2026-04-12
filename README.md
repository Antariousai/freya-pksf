# Freya — PKSF Financial Intelligence Platform

> AI-powered executive intelligence for PKSF's Managing Director and senior leadership. Built by [Antarious AI](https://antarious.com).

---

## What is this?

Freya is a private, conversational financial intelligence platform purpose-built for **Palli Karma-Sahayak Foundation (PKSF)** — one of Bangladesh's largest microfinance apex bodies managing a portfolio of over BDT 10,000 crore across 200+ Partner Organizations (POs).

The platform gives PKSF's Managing Director and leadership team a single, intelligent interface to query portfolio data, analyze financial reports, surface risk signals, and generate structured executive briefs — all in plain language, without needing spreadsheets or manual report generation.

---

## What does Freya do?

### Conversational Portfolio Intelligence
Ask Freya questions in plain English (or Bengali) about PKSF's financial portfolio. Freya understands the full institutional context — programs, projects, PO performance, fund sources, and risk indicators — and responds with structured, data-driven answers.

### AI Audit Brief Generation
Upload any annual report or financial document (PDF). Freya reads and analyzes it using Claude's native document understanding, then automatically generates:
- **Audit Brief** — executive summary of financial position and key findings
- **Discrepancies** — anomalies, risk flags, and compliance concerns
- **Recommendations** — actionable strategic and operational guidance

All outputs appear in structured, professionally designed panels with export capability.

### Knowledge Base Search
Freya has an embedded PKSF knowledge base covering:
- Institutional overview, governance, and history
- All major programs: Agrosor, Jagoron, Sufolon, Buniad
- Partner Organization profiles (BRAC, ASA, TMSS, ESDO, JCF, Padakhep, Shakti, BURO)
- Active projects: RAISE, SMART, RMTP, REOPA, PROSPER, PACE-B
- CES banking, fund sources, PAR metrics, and social impact data
- Disaster risk indicators including Sylhet flood impact modeling

### Live Agentic Tool Use
Freya is not a simple chatbot. It runs a full agentic loop powered by Claude — calling specialized tools in parallel, reasoning over results, and iterating until it has a complete, accurate response. Tools include:

| Tool | Purpose |
|------|---------|
| `search_knowledge_base` | Full-text search over PKSF institutional data |
| `get_portfolio_kpis` | Disbursement, recovery rate, PAR, active borrowers |
| `get_po_performance` | Risk ratings and compliance status per PO |
| `get_project_status` | Utilization rates for donor-funded projects |
| `get_flood_risk_data` | Sylhet flood impact on borrowers and POs |
| `get_ces_bank_utilization` | CES bank fund allocation and utilization |
| `get_psychometric_profiles` | Borrower psychometric assessment data |

### Persistent Sessions
Every conversation is stored in Supabase. Sessions are automatically titled, grouped by date, and fully resumable. Switch between past sessions from the sidebar — output panels repopulate with the last analysis.

### Theme-Aware Design
Full light and dark mode support. All AI-generated HTML output adapts to the active theme using CSS custom properties — no hardcoded colors in generated content.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React, Framer Motion |
| AI | Anthropic Claude (claude-sonnet-4-6), native PDF + vision |
| Database | Supabase (PostgreSQL, full-text search, Auth) |
| Styling | CSS custom properties, inline styles, Tailwind utilities |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/          # Main Freya agent endpoint
│   │   ├── sessions/      # Session CRUD
│   │   ├── kb/seed/       # Knowledge base seeding
│   │   └── setup/         # One-time user creation
│   ├── chat/              # Main chat interface
│   ├── dashboard/         # Portfolio dashboard
│   ├── operations/        # Operations overview
│   ├── profiling/         # Borrower profiling
│   └── login/             # Auth page
├── components/
│   ├── chat/              # ChatArea, Message, TypingIndicator
│   ├── layout/            # TopBar, LeftPanel, RightPanel
│   └── output/            # OutputCard, OutputTabs
└── lib/
    ├── freya-agent.ts     # Core agentic loop
    ├── system-prompt.ts   # Freya's full system prompt + HTML templates
    ├── pksf-knowledge-base.ts  # 18 PKSF knowledge chunks
    ├── supabase.ts        # DB + auth clients
    ├── auth.ts            # Supabase auth helpers
    └── use-auth.ts        # Auth state hook
```

---

## Setup & Deployment

### 1. Supabase — Create Tables
Run `supabase-setup.sql` in your Supabase Dashboard → SQL Editor.

### 2. Supabase — Create Auth User
**Authentication → Users → Add user → Create new user**
- Email: `demo@antarious.com`
- ✅ Auto Confirm User

### 3. Environment Variables
Create `.env.local` with:

```env
ANTHROPIC_API_KEY=your_claude_api_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key

SEED_SECRET=your_seed_secret
```

### 4. Seed Knowledge Base
```bash
curl -X POST https://your-domain.com/api/kb/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"your_seed_secret"}'
```

### 5. Deploy
Push to GitHub → import in [Vercel](https://vercel.com/new) → add environment variables → deploy.

Every `git push` to `main` triggers an automatic redeploy.

---

## Security

- No credentials are stored in source code
- Authentication is handled entirely by Supabase Auth
- Service role key is server-side only (never exposed to the browser)
- All chat sessions are private to the authenticated user

---

*Built by [Antarious AI](https://antarious.com) for PKSF.*
