do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'user_role'
  ) then
    create type user_role as enum ('admin', 'staff', 'supervisor');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  name text,
  email text unique,
  phone text,
  role user_role,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
