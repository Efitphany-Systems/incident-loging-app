create table if not exists public.reporter (

  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  incident_id uuid not null
    references public.incidents(id)
    on delete cascade,

  name text,
  email text,
  phone text,
  wears_glasses boolean default false,
  in_use boolean default false,


  created_at timestamptz default now(),
  updated_at timestamptz default now()
);