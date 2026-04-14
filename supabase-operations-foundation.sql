-- ============================================================
-- FREYA PKSF - Operations And Psychometric Foundation
-- Run this after the base supabase-setup.sql script.
-- This adds the structured tables needed for MD-grade
-- dashboard, operations, and beneficiary psychometric views.
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- Master Data
-- ============================================================

create table if not exists ops_departments (
  id                uuid primary key default gen_random_uuid(),
  code              text unique not null,
  name              text not null,
  head_staff_id     uuid null,
  status            text not null default 'active' check (status in ('active', 'inactive')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_staff (
  id                uuid primary key default gen_random_uuid(),
  staff_code        text unique not null,
  full_name         text not null,
  designation       text not null,
  department_id     uuid null references ops_departments(id) on delete set null,
  manager_staff_id  uuid null references ops_staff(id) on delete set null,
  region            text null,
  phone             text null,
  email             text null,
  employment_status text not null default 'active' check (employment_status in ('active', 'leave', 'inactive')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table ops_departments
  add constraint ops_departments_head_staff_fk
  foreign key (head_staff_id) references ops_staff(id) on delete set null;

create table if not exists ops_po_master (
  id                uuid primary key default gen_random_uuid(),
  po_code           text unique not null,
  name              text not null,
  district          text null,
  division          text null,
  region            text null,
  status            text not null default 'active' check (status in ('active', 'watch', 'inactive')),
  joined_on         date null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_po_branches (
  id                uuid primary key default gen_random_uuid(),
  po_id             uuid not null references ops_po_master(id) on delete cascade,
  branch_code       text unique not null,
  branch_name       text not null,
  district          text null,
  upazila           text null,
  branch_status     text not null default 'active' check (branch_status in ('active', 'watch', 'inactive')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_projects (
  id                uuid primary key default gen_random_uuid(),
  project_code      text unique not null,
  name              text not null,
  department_id     uuid null references ops_departments(id) on delete set null,
  donor             text null,
  start_date        date null,
  end_date          date null,
  status            text not null default 'on-track' check (status in ('on-track', 'watch', 'at-risk', 'closing', 'closed')),
  total_budget      numeric(18,2) null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_project_milestones (
  id                uuid primary key default gen_random_uuid(),
  project_id        uuid not null references ops_projects(id) on delete cascade,
  title             text not null,
  owner_staff_id    uuid null references ops_staff(id) on delete set null,
  due_date          date null,
  status            text not null default 'pending' check (status in ('pending', 'in-progress', 'done', 'delayed')),
  progress_pct      numeric(5,2) not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ============================================================
-- Operational Activity
-- ============================================================

create table if not exists ops_operations_tasks (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  department_id     uuid null references ops_departments(id) on delete set null,
  owner_staff_id    uuid null references ops_staff(id) on delete set null,
  po_id             uuid null references ops_po_master(id) on delete set null,
  project_id        uuid null references ops_projects(id) on delete set null,
  priority          text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  status            text not null default 'open' check (status in ('open', 'in-progress', 'blocked', 'done')),
  due_at            timestamptz null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_field_visits (
  id                uuid primary key default gen_random_uuid(),
  visit_date        date not null,
  staff_id          uuid null references ops_staff(id) on delete set null,
  po_id             uuid null references ops_po_master(id) on delete set null,
  branch_id         uuid null references ops_po_branches(id) on delete set null,
  department_id     uuid null references ops_departments(id) on delete set null,
  visit_status      text not null default 'planned' check (visit_status in ('planned', 'completed', 'missed')),
  finding_count     integer not null default 0,
  summary           text null,
  created_at        timestamptz not null default now()
);

create table if not exists ops_alerts (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  detail            text not null,
  severity          text not null check (severity in ('critical', 'warning', 'info')),
  owner_staff_id    uuid null references ops_staff(id) on delete set null,
  department_id     uuid null references ops_departments(id) on delete set null,
  po_id             uuid null references ops_po_master(id) on delete set null,
  project_id        uuid null references ops_projects(id) on delete set null,
  alert_status      text not null default 'open' check (alert_status in ('open', 'watch', 'resolved')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists ops_department_kpi_daily (
  id                      uuid primary key default gen_random_uuid(),
  snapshot_date           date not null,
  department_id           uuid not null references ops_departments(id) on delete cascade,
  active_staff_count      integer not null default 0,
  pending_tasks_count     integer not null default 0,
  overdue_tasks_count     integer not null default 0,
  sla_breach_count        integer not null default 0,
  created_at              timestamptz not null default now(),
  unique (snapshot_date, department_id)
);

create table if not exists ops_po_kpi_daily (
  id                      uuid primary key default gen_random_uuid(),
  snapshot_date           date not null,
  po_id                   uuid not null references ops_po_master(id) on delete cascade,
  branch_count            integer not null default 0,
  active_borrowers        integer not null default 0,
  active_members          integer not null default 0,
  women_borrower_pct      numeric(5,2) null,
  recovery_rate_pct       numeric(5,2) null,
  par30_pct               numeric(5,2) null,
  disbursement_amount     numeric(18,2) null,
  collection_amount       numeric(18,2) null,
  reporting_delay_hours   integer not null default 0,
  created_at              timestamptz not null default now(),
  unique (snapshot_date, po_id)
);

-- ============================================================
-- Beneficiary And Psychometric Data
-- ============================================================

create table if not exists psy_beneficiaries (
  id                      uuid primary key default gen_random_uuid(),
  beneficiary_code        text unique not null,
  po_id                   uuid null references ops_po_master(id) on delete set null,
  branch_id               uuid null references ops_po_branches(id) on delete set null,
  full_name               text not null,
  gender                  text null,
  date_of_birth           date null,
  district                text null,
  upazila                 text null,
  household_size          integer null,
  monthly_income          numeric(18,2) null,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create table if not exists psy_psychometric_assessments (
  id                      uuid primary key default gen_random_uuid(),
  beneficiary_id          uuid not null references psy_beneficiaries(id) on delete cascade,
  po_id                   uuid null references ops_po_master(id) on delete set null,
  branch_id               uuid null references ops_po_branches(id) on delete set null,
  assessor_staff_id       uuid null references ops_staff(id) on delete set null,
  assessment_date         timestamptz not null default now(),
  status                  text not null default 'completed' check (status in ('pending', 'completed', 'manual-review', 'rejected')),
  completion_pct          numeric(5,2) not null default 0,
  model_version           text null,
  created_at              timestamptz not null default now()
);

create table if not exists psy_psychometric_scores (
  id                      uuid primary key default gen_random_uuid(),
  assessment_id           uuid not null references psy_psychometric_assessments(id) on delete cascade,
  total_score             numeric(8,2) null,
  risk_band               text null check (risk_band in ('low', 'moderate', 'elevated', 'high')),
  rating                  text null check (rating in ('A', 'B', 'C', 'D')),
  confidence_pct          numeric(5,2) null,
  financial_discipline    numeric(8,2) null,
  resilience              numeric(8,2) null,
  repayment_intent        numeric(8,2) null,
  enterprise_stability    numeric(8,2) null,
  created_at              timestamptz not null default now()
);

create table if not exists psy_loans (
  id                      uuid primary key default gen_random_uuid(),
  beneficiary_id          uuid not null references psy_beneficiaries(id) on delete cascade,
  po_id                   uuid null references ops_po_master(id) on delete set null,
  branch_id               uuid null references ops_po_branches(id) on delete set null,
  loan_number             text unique not null,
  disbursement_date       date null,
  product_type            text null,
  principal_amount        numeric(18,2) null,
  outstanding_amount      numeric(18,2) null,
  installment_due_amount  numeric(18,2) null,
  days_past_due           integer not null default 0,
  loan_status             text not null default 'active' check (loan_status in ('active', 'closed', 'written-off')),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create table if not exists psy_collections_daily (
  id                      uuid primary key default gen_random_uuid(),
  snapshot_date           date not null,
  loan_id                 uuid not null references psy_loans(id) on delete cascade,
  collected_amount        numeric(18,2) not null default 0,
  due_amount              numeric(18,2) not null default 0,
  created_at              timestamptz not null default now(),
  unique (snapshot_date, loan_id)
);

create table if not exists psy_accuracy_daily (
  id                      uuid primary key default gen_random_uuid(),
  snapshot_date           date not null,
  po_id                   uuid null references ops_po_master(id) on delete set null,
  branch_id               uuid null references ops_po_branches(id) on delete set null,
  model_version           text not null,
  assessed_count          integer not null default 0,
  approved_count          integer not null default 0,
  manual_review_count     integer not null default 0,
  override_count          integer not null default 0,
  delinquent_count        integer not null default 0,
  accuracy_pct            numeric(5,2) null,
  false_positive_pct      numeric(5,2) null,
  false_negative_pct      numeric(5,2) null,
  created_at              timestamptz not null default now(),
  unique (snapshot_date, po_id, branch_id, model_version)
);

-- ============================================================
-- Indexes
-- ============================================================

create index if not exists idx_ops_staff_department            on ops_staff(department_id, employment_status);
create index if not exists idx_ops_po_master_status            on ops_po_master(status, division, district);
create index if not exists idx_ops_po_branches_po             on ops_po_branches(po_id, branch_status);
create index if not exists idx_ops_projects_department         on ops_projects(department_id, status);
create index if not exists idx_ops_tasks_owner_status          on ops_operations_tasks(owner_staff_id, status, priority);
create index if not exists idx_ops_tasks_department_status     on ops_operations_tasks(department_id, status, priority);
create index if not exists idx_ops_alerts_severity_status      on ops_alerts(severity, alert_status, created_at desc);
create index if not exists idx_ops_department_kpi_daily_date   on ops_department_kpi_daily(snapshot_date desc, department_id);
create index if not exists idx_ops_po_kpi_daily_date           on ops_po_kpi_daily(snapshot_date desc, po_id);
create index if not exists idx_psy_beneficiaries_po_branch     on psy_beneficiaries(po_id, branch_id);
create index if not exists idx_psy_assessments_po_status       on psy_psychometric_assessments(po_id, branch_id, status, assessment_date desc);
create index if not exists idx_psy_scores_assessment           on psy_psychometric_scores(assessment_id, risk_band, rating);
create index if not exists idx_psy_loans_beneficiary_status    on psy_loans(beneficiary_id, loan_status, days_past_due);
create index if not exists idx_psy_collections_daily_date      on psy_collections_daily(snapshot_date desc, loan_id);
create index if not exists idx_psy_accuracy_daily_date         on psy_accuracy_daily(snapshot_date desc, po_id, branch_id);

-- ============================================================
-- RLS (open for demo; tighten in production)
-- ============================================================

alter table ops_departments                 enable row level security;
alter table ops_staff                       enable row level security;
alter table ops_po_master                   enable row level security;
alter table ops_po_branches                 enable row level security;
alter table ops_projects                    enable row level security;
alter table ops_project_milestones          enable row level security;
alter table ops_operations_tasks            enable row level security;
alter table ops_field_visits                enable row level security;
alter table ops_alerts                      enable row level security;
alter table ops_department_kpi_daily        enable row level security;
alter table ops_po_kpi_daily                enable row level security;
alter table psy_beneficiaries               enable row level security;
alter table psy_psychometric_assessments    enable row level security;
alter table psy_psychometric_scores         enable row level security;
alter table psy_loans                       enable row level security;
alter table psy_collections_daily           enable row level security;
alter table psy_accuracy_daily              enable row level security;

create policy "demo read ops_departments"              on ops_departments              for select using (true);
create policy "demo read ops_staff"                    on ops_staff                    for select using (true);
create policy "demo read ops_po_master"                on ops_po_master                for select using (true);
create policy "demo read ops_po_branches"              on ops_po_branches              for select using (true);
create policy "demo read ops_projects"                 on ops_projects                 for select using (true);
create policy "demo read ops_project_milestones"       on ops_project_milestones       for select using (true);
create policy "demo read ops_operations_tasks"         on ops_operations_tasks         for select using (true);
create policy "demo read ops_field_visits"             on ops_field_visits             for select using (true);
create policy "demo read ops_alerts"                   on ops_alerts                   for select using (true);
create policy "demo read ops_department_kpi_daily"     on ops_department_kpi_daily     for select using (true);
create policy "demo read ops_po_kpi_daily"             on ops_po_kpi_daily             for select using (true);
create policy "demo read psy_beneficiaries"            on psy_beneficiaries            for select using (true);
create policy "demo read psy_psychometric_assessments" on psy_psychometric_assessments for select using (true);
create policy "demo read psy_psychometric_scores"      on psy_psychometric_scores      for select using (true);
create policy "demo read psy_loans"                    on psy_loans                    for select using (true);
create policy "demo read psy_collections_daily"        on psy_collections_daily        for select using (true);
create policy "demo read psy_accuracy_daily"           on psy_accuracy_daily           for select using (true);
