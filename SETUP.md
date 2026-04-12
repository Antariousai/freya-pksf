# Freya PKSF — Backend Setup Guide

## 1. Create Supabase Project
1. Go to https://supabase.com → New Project
2. Copy your **Project URL**, **anon key**, and **service_role key** from Settings > API

## 2. Run Database SQL
In Supabase → SQL Editor, paste and run the entire contents of `supabase-setup.sql`

## 3. Configure Environment Variables
Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
SEED_SECRET=pksf-freya-seed-2025
```

## 4. Seed the Knowledge Base
After the app is running (`npm run dev`), call:
```bash
curl -X POST http://localhost:3000/api/kb/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"pksf-freya-seed-2025"}'
```
Or visit the endpoint from any REST client. This seeds 18 PKSF knowledge chunks.

## 5. Verify
```bash
curl http://localhost:3000/api/kb/seed
# → {"document_count":18}
```

## Demo Login
- Email: admin@pksf.gov.bd
- Password: Freya@2025

## Architecture
- **Freya Agent**: Claude claude-sonnet-4-6 with 7 tools (search_knowledge_base, get_portfolio_kpis, get_po_performance, get_project_status, get_flood_risk_data, get_ces_bank_utilization, get_psychometric_profiles)
- **Knowledge Base**: Supabase PostgreSQL with full-text search (pgvector-ready for future embedding upgrade)
- **Sessions**: Persisted in Supabase chat_sessions + chat_messages tables with auto-title generation
- **MD Context**: Dr. Mohammad Jashim Uddin profile embedded in system prompt for personalized responses
