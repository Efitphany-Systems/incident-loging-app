export interface Incident {
  id: string;
  created_at: string;
  category: string;
  location: string;
  severity: string;
}

export type Incidents = Incident[];

export interface Patron {
  id: string;
  name: string;
  email: string;
  phone: string;
  contact_time: string;
  address_street: string;
  address_city: string;
}

export interface Reporter {
  id: string;
  name: string;
  email: string;
  phone: string;
  wears_glasses: boolean;
  in_use: boolean;
}

export interface Witness {
  id: string;
  name: string;
  email: string;
  phone: string;
  employee: boolean;
  contact_time: string;
  created_at: string;
  updated_at: string;
  incident_id: string;
}

export interface LawInformation {
  law_enforcement_contacted: boolean;
  contact_explanation: string;
  police_report_written: boolean;
  police_report_number: string;
  citation_or_charge_or_arrest: string;
  officer_name_badge: string;
}

export interface MedicalInformation {
  visible_injuries: boolean;
  injury_explanation: string;
  medical_attention_apparent: boolean;
  medical_services_offered: boolean;
  medical_services_accepted: boolean;
  ambulance_requested: boolean;
  ambulance_company: string;
  emt_name_or_number: string;
  patron_left_in_ambulance: boolean;
  destination: string;
}

export interface IncidentReport {
  id: string;
  severity: "low" | "medium" | "high";
  description: string;
  created_at: string;
  category: string;
  category_id: string;
  location: string;
  location_id: string;

  event_name: string;
  event_id: string;
  event_date: string;
  start_time: string;

  venue: string;
  venue_address: string;

  patron: Patron;
  reporter: Reporter | null;
  witnesses: Witness[];

  law: LawInformation | null;
  medical: MedicalInformation | null;
}
