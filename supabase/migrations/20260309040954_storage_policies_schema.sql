-- INSERT policy
drop policy if exists "allow insert for authenticated users" on storage.objects;

create policy "allow insert for authenticated users"
on storage.objects
for insert
with check (
  auth.uid() is not null
  and bucket_id = 'app-storage'
);

-- UPDATE policy
drop policy if exists "allow update for authenticated users" on storage.objects;
create policy "allow update for authenticated users"
on storage.objects
for update
using (
  auth.uid() is not null
  and bucket_id = 'app-storage'
);


-- SELECT policy
drop policy if exists "allow select for authenticated users" on storage.objects;
create policy "allow select for authenticated users"
on storage.objects
for select
using (
  auth.uid() is not null
  and bucket_id = 'app-storage'
);

-- DELETE policy
drop policy if exists "allow delete for authenticated users" on storage.objects;
create policy "allow delete for authenticated users"
on storage.objects
for delete
using (
  auth.uid() is not null
  and bucket_id = 'app-storage'
);