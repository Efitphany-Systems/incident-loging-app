create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),

  venue_id uuid not null
    references public.venues(id)
    on delete cascade,

  name text not null,
  active boolean default true,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
