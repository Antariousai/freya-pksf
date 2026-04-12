-- ============================================================
-- FREYA PKSF — Supabase Database Setup
-- Run this entire script in the Supabase SQL editor once
-- ============================================================

-- ── Knowledge Base ──────────────────────────────────────────
create table if not exists kb_documents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null,   -- 'overview' | 'program' | 'po' | 'project' | 'financial' | 'risk' | 'governance' | 'md_profile'
  content     text not null,
  metadata    jsonb default '{}',
  fts         tsvector generated always as (
                to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,''))
              ) stored,
  created_at  timestamptz default now()
);

create index if not exists idx_kb_fts      on kb_documents using gin(fts);
create index if not exists idx_kb_category on kb_documents(category);

-- ── Chat Sessions ────────────────────────────────────────────
create table if not exists chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default 'New Session',
  color       text not null default '#06b6d4',
  persona     text not null default 'assistant',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Migration: add persona column if upgrading from an older schema
alter table chat_sessions add column if not exists persona text not null default 'assistant';

-- ── Chat Messages ────────────────────────────────────────────
create table if not exists chat_messages (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid not null references chat_sessions(id) on delete cascade,
  role           text not null check (role in ('user', 'assistant')),
  content        text not null default '',
  -- Freya structured output — dynamic panels stored as JSONB
  -- Each element: { type, label, title, html }
  output_panels  jsonb default null,
  created_at     timestamptz default now()
);

create index if not exists idx_messages_session on chat_messages(session_id, created_at);

-- ── Row Level Security (open for demo — tighten in production) ──
alter table kb_documents  enable row level security;
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

create policy "anon read kb"       on kb_documents  for select using (true);
create policy "anon all sessions"  on chat_sessions for all    using (true);
create policy "anon all messages"  on chat_messages for all    using (true);

-- ── Utility: update updated_at on session row ────────────────
create or replace function update_session_timestamp()
returns trigger language plpgsql as $$
begin
  update chat_sessions set updated_at = now() where id = new.session_id;
  return new;
end;
$$;

drop trigger if exists trg_session_updated on chat_messages;
create trigger trg_session_updated
  after insert on chat_messages
  for each row execute function update_session_timestamp();
