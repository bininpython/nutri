-- my nutri · clinical platform expansion
-- Adds the clinical/office modules used by the professional and patient workspaces.

alter table public.meal_plans add column if not exists method text default 'quantitative';
alter table public.meal_plans add column if not exists start_date date;
alter table public.meal_plans add column if not exists end_date date;
alter table public.meal_plans add column if not exists energy_target_kcal integer;
alter table public.meal_plans add column if not exists macro_targets jsonb not null default '{}'::jsonb;

alter table public.food_diary add column if not exists professional_reaction text;
alter table public.food_diary add column if not exists professional_comment text;
alter table public.food_diary add column if not exists updated_at timestamptz not null default now();

create table if not exists public.patient_anamnesis (
  patient_id uuid primary key references public.patients(id) on delete cascade,
  chief_complaint text,
  clinical_history text,
  family_history text,
  allergies text,
  intolerances text,
  medications text,
  supplements text,
  routine text,
  sleep text,
  bowel_habit text,
  hydration text,
  alcohol text,
  smoking text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.health_questionnaires (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null,
  kind text not null default 'pre_consultation',
  status text not null default 'pending' check (status in ('pending','answered','reviewed')),
  score numeric,
  answers jsonb not null default '{}'::jsonb,
  sent_at timestamptz not null default now(),
  answered_at timestamptz,
  reviewed_at timestamptz
);

create table if not exists public.anthropometry_assessments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  assessed_at timestamptz not null default now(),
  method text,
  weight_kg numeric(6,2),
  body_fat_pct numeric(5,2),
  lean_mass_kg numeric(6,2),
  muscle_mass_kg numeric(6,2),
  waist_cm numeric(6,2),
  hip_cm numeric(6,2),
  arm_cm numeric(6,2),
  thigh_cm numeric(6,2),
  neck_cm numeric(6,2),
  skinfolds jsonb not null default '{}'::jsonb,
  circumferences jsonb not null default '{}'::jsonb,
  bioimpedance jsonb not null default '{}'::jsonb,
  notes text
);

create table if not exists public.lab_results (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  collected_at date,
  marker text not null,
  value_text text not null,
  unit text,
  reference_range text,
  classification text default 'normal' check (classification in ('normal','attention','critical','unclassified')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.patient_goals (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null,
  target_text text,
  frequency text,
  progress_pct integer not null default 0 check (progress_pct between 0 and 100),
  active boolean not null default true,
  starts_at date default current_date,
  ends_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goal_checkins (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.patient_goals(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  value numeric,
  note text,
  checked_at timestamptz not null default now()
);

create table if not exists public.clinical_notes (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  note_type text not null default 'evolution',
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patient_documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  document_type text not null default 'guidance',
  file_url text,
  visible_to_patient boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  formula text not null,
  instructions text,
  valid_until date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  attachment_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.financial_transactions (
  id uuid primary key default gen_random_uuid(),
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete set null,
  description text not null,
  amount_cents integer not null check (amount_cents >= 0),
  due_date date,
  paid_at timestamptz,
  status text not null default 'pending' check (status in ('pending','paid','cancelled','overdue')),
  payment_method text,
  receipt_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.plan_templates (
  id uuid primary key default gen_random_uuid(),
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  method text not null default 'quantitative',
  energy_target_kcal integer,
  structure jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.food_library (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  food_group text,
  serving_amount numeric(8,2) not null default 100,
  serving_unit text not null default 'g',
  calories numeric(8,2),
  protein_g numeric(8,2),
  carbs_g numeric(8,2),
  fat_g numeric(8,2),
  fiber_g numeric(8,2),
  source text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category text,
  preparation text,
  ingredients jsonb not null default '[]'::jsonb,
  nutrition jsonb not null default '{}'::jsonb,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questionnaire_patient_idx on public.health_questionnaires(patient_id, sent_at desc);
create index if not exists anthropometry_patient_idx on public.anthropometry_assessments(patient_id, assessed_at desc);
create index if not exists lab_results_patient_idx on public.lab_results(patient_id, collected_at desc);
create index if not exists patient_goals_patient_idx on public.patient_goals(patient_id, active);
create index if not exists clinical_notes_patient_idx on public.clinical_notes(patient_id, created_at desc);
create index if not exists patient_documents_patient_idx on public.patient_documents(patient_id, created_at desc);
create index if not exists prescriptions_patient_idx on public.prescriptions(patient_id, created_at desc);
create index if not exists messages_patient_idx on public.messages(patient_id, created_at);
create index if not exists finance_nutritionist_idx on public.financial_transactions(nutritionist_id, due_date);
create index if not exists food_library_name_idx on public.food_library(name);

alter table public.patient_anamnesis enable row level security;
alter table public.health_questionnaires enable row level security;
alter table public.anthropometry_assessments enable row level security;
alter table public.lab_results enable row level security;
alter table public.patient_goals enable row level security;
alter table public.goal_checkins enable row level security;
alter table public.clinical_notes enable row level security;
alter table public.patient_documents enable row level security;
alter table public.prescriptions enable row level security;
alter table public.messages enable row level security;
alter table public.financial_transactions enable row level security;
alter table public.plan_templates enable row level security;
alter table public.food_library enable row level security;
alter table public.recipes enable row level security;

create policy "anamnesis professional manage" on public.patient_anamnesis for all
using (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()))
with check (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()));

create policy "questionnaire shared read" on public.health_questionnaires for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "questionnaire professional manage" on public.health_questionnaires for all
using (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()))
with check (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()));

create policy "anthropometry shared read" on public.anthropometry_assessments for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "anthropometry professional manage" on public.anthropometry_assessments for all
using (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()))
with check (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()));

create policy "labs shared read" on public.lab_results for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "labs professional manage" on public.lab_results for all
using (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()))
with check (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()));

create policy "goals shared read" on public.patient_goals for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "goals professional manage" on public.patient_goals for all
using (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()))
with check (exists(select 1 from public.patients p where p.id=patient_id and p.nutritionist_id=auth.uid()));

create policy "goal checkins shared read" on public.goal_checkins for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "goal checkins patient insert" on public.goal_checkins for insert
with check (exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid()));

create policy "clinical notes professional only" on public.clinical_notes for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());

create policy "documents professional manage" on public.patient_documents for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());
create policy "documents patient read" on public.patient_documents for select
using (visible_to_patient and exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid()));

create policy "prescriptions professional manage" on public.prescriptions for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());
create policy "prescriptions patient read" on public.prescriptions for select
using (exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid()));

create policy "messages shared read" on public.messages for select
using (exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));
create policy "messages shared insert" on public.messages for insert
with check (sender_id=auth.uid() and exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid())));

create policy "finance professional only" on public.financial_transactions for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());

create policy "templates professional only" on public.plan_templates for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());

create policy "food library authenticated read" on public.food_library for select
to authenticated using (is_public or created_by=auth.uid());
create policy "food library professional own write" on public.food_library for all
using (created_by=auth.uid()) with check (created_by=auth.uid());

create policy "recipes professional own" on public.recipes for all
using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());
