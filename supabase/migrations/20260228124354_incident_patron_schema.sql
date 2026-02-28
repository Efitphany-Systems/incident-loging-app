create table if not exists public.patron (

  id uuid primary key default gen_random_uuid(),

  incident_id uuid not null
    references public.incidents(id)
    on delete cascade,

  name text,
  email text,
  phone text,

  contact_time text,

  address_street text,
  address_city text

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);