create or replace view public.incidents_flat as
select
  i.id,
  i.created_by,
  i.severity,
  c.name as category,
  l.name as location
from public.incidents i
join public.incident_categories c on c.id = i.category_id
join public.locations l on l.id = i.location_id;