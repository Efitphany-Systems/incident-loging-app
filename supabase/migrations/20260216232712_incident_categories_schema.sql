create table if not exists public.incident_categories (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  icon text,
  active boolean default true,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint incident_categories_name_unique unique (name)
);
