create or replace function create_incident_function(payload jsonb)
returns uuid
language plpgsql
as $$
declare
  new_incident_id uuid;
begin

  -- 1️⃣ Insert incident
  insert into incidents (
    category_id,
    event_id,
    severity,
    description,
    location_id,
    created_by,
    images
  )
  values (
    (payload->'eventAndFillerInformation'->>'category_id')::uuid,
    (payload->'eventAndFillerInformation'->>'event_id')::uuid,
    (payload->'eventAndFillerInformation'->>'severity')::incident_severity,
    payload->'eventAndFillerInformation'->>'description',
    (payload->'eventAndFillerInformation'->>'location_id')::uuid,
    (payload->>'user_id')::uuid,
    coalesce(payload->'eventAndFillerInformation'->'images', '[]'::jsonb)
  )
  returning id into new_incident_id;


  -- 2️⃣ Reporter
  insert into reporter (
    user_id,
    incident_id,
    name,
    email,
    phone,
    wears_glasses,
    in_use
  )
  values (
    (payload->>'user_id')::uuid,
    new_incident_id,
    payload->>'user_name',
    payload->>'user_email',
    payload->>'user_phone',
    (payload->'eventAndFillerInformation'->>'wears_glasses')::boolean,
    (payload->'eventAndFillerInformation'->>'in_use')::boolean
  );


  -- 3️⃣ Patron
  insert into patron (
    incident_id,
    name,
    email,
    phone,
    contact_time,
    gender,
    age,
    address_street,
    address_city
  )
  values (
    
    new_incident_id,
    payload->'patron'->>'name',
    payload->'patron'->>'email',
    payload->'patron'->>'phone',
    payload->'patron'->>'contact_time',
    payload->'patron'->>'gender',
    (payload->'patron'->>'age')::numeric,
    payload->'patron'->>'address_street',
    payload->'patron'->>'address_city'
  );


  -- 4️⃣ Witnesses (SAFE)
  if payload ? 'witnesses'
     and jsonb_typeof(payload->'witnesses') = 'array'
     and jsonb_array_length(payload->'witnesses') > 0
  then
    insert into witnesses (
      incident_id,
      name,
      email,
      phone,
      contact_time,
      employee
    )
    select
      new_incident_id,
      w->>'name',
      w->>'email',
      w->>'phone',
      w->>'contact_time',
      (w->>'employee')::boolean
    from jsonb_array_elements(payload->'witnesses') w;
  end if;


  -- 5️⃣ Medical (OPTIONAL)
  if payload ? 'medical' then
    insert into medical_information (
      incident_id,
      visible_injuries,
      injury_explanation,
      medical_attention_apparent,
      medical_services_offered,
      medical_services_accepted,
      ambulance_requested,
      ambulance_company,
      emt_name_or_number,
      patron_left_in_ambulance,
      destination
    )
    values (
      new_incident_id,
      (payload->'medical'->>'visible_injuries')::boolean,
      payload->'medical'->>'injury_explanation',
      (payload->'medical'->>'medical_attention_apparent')::boolean,
      (payload->'medical'->>'medical_services_offered')::boolean,
      (payload->'medical'->>'medical_services_accepted')::boolean,
      (payload->'medical'->>'ambulance_requested')::boolean,
      payload->'medical'->>'ambulance_company',
      payload->'medical'->>'emt_name_or_number',
      (payload->'medical'->>'patron_left_in_ambulance')::boolean,
      payload->'medical'->>'destination'
    );
  end if;


  -- 6️⃣ Law (OPTIONAL)
  if payload ? 'law' then
    insert into law_enforcement_information (
      incident_id,
      law_enforcement_contacted,
      contact_explanation,
      police_report_written,
      police_report_number,
      citation_or_charge_or_arrest,
      officer_name_badge
    )
    values (
      new_incident_id,
      (payload->'law'->>'law_enforcement_contacted')::boolean,
      payload->'law'->>'contact_explanation',
      (payload->'law'->>'police_report_written')::boolean,
      payload->'law'->>'police_report_number',
      payload->'law'->>'citation_or_charge_or_arrest',
      payload->'law'->>'officer_name_badge'
    );
  end if;

  return new_incident_id;

end;
$$;