create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  additional_information text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
