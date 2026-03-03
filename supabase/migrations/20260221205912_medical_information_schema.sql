create table medical_information (
    id uuid primary key default gen_random_uuid(),

    incident_id uuid not null references incidents(id) on delete cascade,

    visible_injuries boolean,
    injury_explanation text,

    medical_attention_apparent boolean,
    medical_services_offered boolean,

    medical_services_accepted boolean, -- true=accepted, false=refused

    ambulance_requested boolean,
    ambulance_company text,
    emt_name_or_number text,

    patron_left_in_ambulance boolean,
    destination text,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);