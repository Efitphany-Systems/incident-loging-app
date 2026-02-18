create table if not exists public.witnesses (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    email text,

    incident_id uuid not null
        references public.incidents(id)
        on delete cascade,

    contact_time timestamptz,
    employee boolean not null default false,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
