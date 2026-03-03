"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { IncidentReport } from "@/types/incidents";
import { revalidatePath } from "next/cache";

export async function getIncidentsAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("get_incidents_view").select(`*`);

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteIncidentsAction(id: string) {
  const supabase = await supabaseServer();
  const { error: profileError } = await supabase.from("incidents").delete().eq("id", id);

  if (profileError) {
    throw new Error(`Incident delete failed: ${profileError.message}`);
  }

  revalidatePath("/incidents");

  return { success: true };
}

export async function getLocationsByVenueAction(VENUE_ID: string) {
  console.log(VENUE_ID);

  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("locations").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export async function getIncidentByIDAction(ID: string) {
  // move this implemenation to view
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("incidents")
    .select(
      `
    *,
    incident_categories (*),
    locations (*),
    events (
      *,
      venues (*)
    ),
    patron (*),
    reporter (*),
    witnesses (*),
    law_enforcement_information (*),
    medical_information (*)
  `
    )
    .eq("id", ID)
    .single();

  if (error) throw new Error(error.message);

  console.log(data);

  const response: IncidentReport = {
    id: data?.id,
    severity: data.severity,
    description: data.description,
    created_at: data?.created_at,
    category: data?.incident_categories?.name,
    category_id: data?.incident_categories?.id,
    location: data?.locations?.name,
    location_id: data?.locations?.id,
    event_name: data?.events?.name,
    event_id: data?.events?.id,
    event_date: data?.events?.event_date,
    start_time: data?.events?.start_time,
    venue: data?.events?.venues?.name,
    venue_address: data?.events?.venues?.address,

    patron: {
      id: data?.patron[0]?.id,
      name: data?.patron[0]?.name,
      email: data?.patron[0]?.email,
      phone: data?.patron[0]?.phone,
      gender: data?.patron[0]?.gender,
      age: data?.patron[0]?.age,
      contact_time: data?.patron[0]?.contact_time,
      address_street: data?.patron[0]?.address_street,
      address_city: data?.patron[0]?.address_city,
    },
    reporter: {
      id: data?.reporter[0]?.id,
      name: data?.reporter[0]?.name,
      email: data?.reporter[0]?.email,
      phone: data?.reporter[0]?.phone,
      in_use: data?.reporter[0]?.in_use,
      wears_glasses: data?.reporter[0]?.wears_glasses,
    },
    witnesses: data?.witnesses,
    law: data?.law_enforcement_information[0] ?? null,
    medical: data?.medical_information[0] ?? null,
  };

  console.log(response);

  return response;
}

export async function getIncidentCategoriesAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("incident_categories").select("*");

  if (error) throw new Error(error.message);

  return data;
}
