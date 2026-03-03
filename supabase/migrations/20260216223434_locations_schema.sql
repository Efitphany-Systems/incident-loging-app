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



with v as (
  select 'e57ab8bf-a4e6-47b6-bd92-e5aff9558f9c'::uuid as vid
)
insert into public.locations (venue_id, name)
select vid, name
from v,
(
  values
    ('Main Stage'),
    ('Front of Stage'),
    ('Backstage'),
    ('Stage Left'),
    ('Stage Right'),
    ('Center Stage'),
    ('Podium Area'),
    ('Performance Area')
) as t(name);