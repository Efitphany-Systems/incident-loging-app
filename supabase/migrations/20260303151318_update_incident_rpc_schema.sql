create or replace function update_incident_function(
  p_incident_id uuid,
  payload jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin


  -- 1️⃣ Update incident
  update incidents
  set
    category_id = (payload->'eventAndFillerInformation'->>'category_id')::uuid,
    event_id = (payload->'eventAndFillerInformation'->>'event_id')::uuid,
    severity = (payload->'eventAndFillerInformation'->>'severity')::incident_severity,
    description = payload->'eventAndFillerInformation'->>'description',
    location_id = (payload->'eventAndFillerInformation'->>'location_id')::uuid,
    images = coalesce(payload->'eventAndFillerInformation'->'images', '[]'::jsonb),
    updated_at = now()
  where id = p_incident_id;


  -- 2️⃣ Update reporter
  update reporter
  set
    wears_glasses = (payload->'eventAndFillerInformation'->>'wears_glasses')::boolean,
    in_use = (payload->'eventAndFillerInformation'->>'in_use')::boolean
  where incident_id = p_incident_id;


  -- 3️⃣ Update patron
  update patron
  set
    name = payload->'patron'->>'name',
    email = payload->'patron'->>'email',
    phone = payload->'patron'->>'phone',
    contact_time = payload->'patron'->>'contact_time',
    gender = payload->'patron'->>'gender',
    age = (payload->'patron'->>'age')::numeric,
    address_street = payload->'patron'->>'address_street',
    address_city = payload->'patron'->>'address_city'
  where incident_id = p_incident_id;


  -- 4️⃣ Replace witnesses (simple & safe)
  delete from witnesses
  where incident_id = p_incident_id;

  if payload ? 'witnesses'
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
      p_incident_id,
      w->>'name',
      w->>'email',
      w->>'phone',
      w->>'contact_time',
      (w->>'employee')::boolean
    from jsonb_array_elements(payload->'witnesses') w;
  end if;


  -- 5️⃣ Upsert medical
  if payload ? 'medical' then
    delete from medical_information where incident_id = p_incident_id;

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
      p_incident_id,
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


  -- 6️⃣ Upsert law
  if payload ? 'law' then
    delete from law_enforcement_information
    where incident_id = p_incident_id;

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
      p_incident_id,
      (payload->'law'->>'law_enforcement_contacted')::boolean,
      payload->'law'->>'contact_explanation',
      (payload->'law'->>'police_report_written')::boolean,
      payload->'law'->>'police_report_number',
      payload->'law'->>'citation_or_charge_or_arrest',
      payload->'law'->>'officer_name_badge'
    );
  end if;

end;
$$;