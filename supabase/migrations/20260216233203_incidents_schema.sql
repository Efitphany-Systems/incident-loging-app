do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'incident_severity'
  ) then
    create type public.incident_severity as enum (
      'low',
      'medium',
      'high'
    );
  end if;
end
$$;

create table if not exists public.incidents (
    id uuid primary key default gen_random_uuid(),

    category_id uuid not null
        references public.incident_categories(id)
        on delete restrict,

    location_id uuid not null
        references public.locations(id)
        on delete restrict,

    event_id uuid not null
        references public.events(id)
        on delete cascade,

    created_by uuid
        references public.profiles(id)
        on delete set null,

    severity public.incident_severity not null default 'low',
    
    description text,

    status text not null default 'open',

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
