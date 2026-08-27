-- my nutri - esquema inicial Supabase/Postgres
create extension if not exists pgcrypto;

create type public.user_role as enum ('nutritionist','patient');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  full_name text not null,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.nutritionists (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  crn text,
  specialty text,
  bio text
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  user_id uuid unique references public.profiles(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  birth_date date,
  height_cm numeric(5,2),
  current_weight_kg numeric(6,2),
  target_weight_kg numeric(6,2),
  goal text,
  status text not null default 'active' check (status in ('active','paused','archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null default 'Plano alimentar',
  instructions text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meals (
  id uuid primary key default gen_random_uuid(),
  meal_plan_id uuid not null references public.meal_plans(id) on delete cascade,
  name text not null,
  scheduled_time time,
  calories integer,
  position integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table public.meal_items (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references public.meals(id) on delete cascade,
  food_name text not null,
  quantity numeric(8,2),
  unit text,
  calories integer,
  protein_g numeric(8,2),
  carbs_g numeric(8,2),
  fat_g numeric(8,2)
);

create table public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  weight_kg numeric(6,2),
  waist_cm numeric(6,2),
  body_fat_pct numeric(5,2),
  water_l numeric(5,2),
  steps integer,
  sleep_hours numeric(4,2),
  adherence_pct integer check (adherence_pct between 0 and 100),
  notes text
);

create table public.food_diary (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  occurred_at timestamptz not null default now(),
  meal_name text,
  description text not null,
  hunger_before integer check (hunger_before between 0 and 10),
  satiety_after integer check (satiety_after between 0 and 10),
  mood text,
  photo_url text
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  nutritionist_id uuid not null references public.profiles(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz,
  mode text default 'online',
  status text default 'scheduled',
  notes text
);

create index patients_nutritionist_idx on public.patients(nutritionist_id);
create index progress_patient_idx on public.progress_entries(patient_id, recorded_at desc);
create index diary_patient_idx on public.food_diary(patient_id, occurred_at desc);
create index appointments_nutritionist_idx on public.appointments(nutritionist_id, starts_at);

alter table public.profiles enable row level security;
alter table public.nutritionists enable row level security;
alter table public.patients enable row level security;
alter table public.meal_plans enable row level security;
alter table public.meals enable row level security;
alter table public.meal_items enable row level security;
alter table public.progress_entries enable row level security;
alter table public.food_diary enable row level security;
alter table public.appointments enable row level security;

create policy "profile own read" on public.profiles for select using (id = auth.uid());
create policy "profile own update" on public.profiles for update using (id = auth.uid());
create policy "nutritionist own row" on public.nutritionists for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "nutritionist manages patients" on public.patients for all
using (nutritionist_id = auth.uid()) with check (nutritionist_id = auth.uid());
create policy "patient reads self" on public.patients for select using (user_id = auth.uid());

create policy "meal plans access" on public.meal_plans for all using (
  exists(select 1 from public.patients p where p.id = patient_id and (p.nutritionist_id = auth.uid() or p.user_id = auth.uid()))
) with check (
  exists(select 1 from public.patients p where p.id = patient_id and p.nutritionist_id = auth.uid())
);

create policy "meals access" on public.meals for all using (
  exists(select 1 from public.meal_plans mp join public.patients p on p.id=mp.patient_id where mp.id=meal_plan_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid()))
) with check (
  exists(select 1 from public.meal_plans mp join public.patients p on p.id=mp.patient_id where mp.id=meal_plan_id and p.nutritionist_id=auth.uid())
);

create policy "meal items access" on public.meal_items for all using (
  exists(select 1 from public.meals m join public.meal_plans mp on mp.id=m.meal_plan_id join public.patients p on p.id=mp.patient_id where m.id=meal_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid()))
) with check (
  exists(select 1 from public.meals m join public.meal_plans mp on mp.id=m.meal_plan_id join public.patients p on p.id=mp.patient_id where m.id=meal_id and p.nutritionist_id=auth.uid())
);

create policy "progress shared access" on public.progress_entries for select using (
  exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid()))
);
create policy "progress patient insert" on public.progress_entries for insert with check (
  exists(select 1 from public.patients p where p.id=patient_id and (p.user_id=auth.uid() or p.nutritionist_id=auth.uid()))
);
create policy "progress shared update" on public.progress_entries for update using (
  exists(select 1 from public.patients p where p.id=patient_id and (p.user_id=auth.uid() or p.nutritionist_id=auth.uid()))
);

create policy "diary shared read" on public.food_diary for select using (
  exists(select 1 from public.patients p where p.id=patient_id and (p.nutritionist_id=auth.uid() or p.user_id=auth.uid()))
);
create policy "diary patient write" on public.food_diary for all using (
  exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid())
) with check (
  exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid())
);

create policy "appointment professional access" on public.appointments for all using (nutritionist_id=auth.uid()) with check (nutritionist_id=auth.uid());
create policy "appointment patient read" on public.appointments for select using (
  exists(select 1 from public.patients p where p.id=patient_id and p.user_id=auth.uid())
);
