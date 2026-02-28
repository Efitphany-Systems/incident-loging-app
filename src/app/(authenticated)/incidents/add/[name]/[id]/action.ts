"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";

export async function createIncidentAction(payload: IncidentPayload) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();
  console.log(payload);

  if (user && user.role == "admin") {
    const { data: incident, error: incidentError } = await supabase
      .from("incidents")
      .insert({
        category_id: payload.eventAndFillerInformation.category,
        event_id: payload.eventAndFillerInformation.show,
        severity: payload.eventAndFillerInformation.severity,
        description: payload.eventAndFillerInformation.description,
        created_by: user.id,
      })
      .select()
      .single();

    if (incidentError) throw new Error(incidentError.message);

    const { error: reporterError } = await supabase.from("reporter").insert({
      user_id: user.id,
      incident_id: incident.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      wears_glasses: payload.eventAndFillerInformation.wearsGlasses,
      in_use: payload.eventAndFillerInformation.inUse,
    });

    if (reporterError) throw new Error(reporterError.message);

    const { error: patronError } = await supabase.from("patron").insert({
      incident_id: incident.id,
      name: payload.patronInformation.name,
      email: payload.patronInformation.email,
      phone: payload.patronInformation.phone,
      contact_time: payload.patronInformation.contactTime,
      address_street: payload.patronInformation.address_street,
      address_city: payload.patronInformation.address_city,
    });

    if (patronError) throw new Error(patronError.message);

    const witnessesData = payload.witnesses.map((w) => ({
      incident_id: incident.id,
      name: w.name,
      email: w.email,
      contact_time: w.contactTime,
      employee: w.employmentType === "employee",
    }));
    const { error: witnessError } = await supabase.from("witnesses").insert(witnessesData);

    if (witnessError) throw new Error(witnessError.message);

    if (payload.medical) {
      const m = payload.medical;

      const { error: medicalError } = await supabase.from("medical_information").insert({
        incident_id: incident.id,

        visible_injuries: m.visibleInjuries,
        injury_explanation: m.visibleInjuriesExplain,

        medical_attention_apparent: m.medicalAttention,
        medical_services_offered: m.offeredMedical,
        medical_services_accepted: m.accepted,

        ambulance_requested: m.ambulanceRequested,
        ambulance_company: m.ambulanceCompany,
        emt_name_or_number: m.ambulanceEMT,

        patron_left_in_ambulance: m.didPatientLeaveAmbulance,
        destination: m.whereTheyGo,
      });

      if (medicalError) throw new Error(medicalError.message);
    }

    if (payload.lawEnforcement) {
      const l = payload.lawEnforcement;

      const { error: lawError } = await supabase.from("law_enforcement_information").insert({
        incident_id: incident.id,

        law_enforcement_contacted: l.contacted,
        contact_explanation: l.explanation,

        police_report_written: l.reportWritten,
        police_report_number: l.reportNumber,

        citation_or_charge_or_arrest: l.citation,
        officer_name_badge: l.officerName,
      });

      if (lawError) throw new Error(lawError.message);
    }

    return {
      success: true,
    };
  } else {
    throw new Error("Invalid Operation");
  }
}
