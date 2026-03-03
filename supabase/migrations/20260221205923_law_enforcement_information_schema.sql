create table law_enforcement_information (
    id uuid primary key default gen_random_uuid(),

    incident_id uuid not null references incidents(id) on delete cascade,

    law_enforcement_contacted boolean,
    contact_explanation text,

    police_report_written boolean,
    police_report_number text,

    citation_or_charge_or_arrest text,

    officer_name_badge text,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);