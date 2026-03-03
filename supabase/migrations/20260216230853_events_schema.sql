create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),

  venue_id uuid not null
    references public.venues(id)
    on delete cascade,

  name text not null,

  event_date date not null,
  start_time time,
  end_time time,

  created_by uuid
    references public.profiles(id)
    on delete set null,

  additional_information text,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint events_time_check
    check (
      start_time is null
      or end_time is null
      or start_time <= end_time
    )
);
