"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { IncidentFilters, IncidentImages, IncidentReport } from "@/types/incidents";
import { revalidatePath } from "next/cache";

export async function getIncidentsAction(filters?: IncidentFilters) {
  const supabase = await supabaseServer();

  let query = supabase.from("get_incidents_view").select("*");

  console.log(query);

  if (filters?.date) {
    const startOfDay = new Date(filters.date);
    const endOfDay = new Date(filters.date);
    endOfDay.setHours(23, 59, 59, 999);

    query = query.gte("created_at", startOfDay.toISOString()).lte("created_at", endOfDay.toISOString());
  }
  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.severity) {
    query = query.eq("severity", filters.severity);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
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
    images: data?.images,
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

export async function shiftImageFromTemp(images: IncidentImages) {
  const supabase = await supabaseServer();
  const movedImages = [];

  const { data, error } = await supabase.storage.from("incidents-images").list("temp");
  console.log("Error in temp geting ", error);
  console.log("Files in temp ", data);

  for (const image of images) {
    const fileName = image.path.split("/").pop();

    const newPath = `incidents/${fileName}`;

    console.log("New path ", newPath, " image.path ", image.path);

    const { error } = await supabase.storage.from("incidents-images").move(image.path, newPath);
    console.log("error ", error);
    const { data } = supabase.storage.from("incidents-images").getPublicUrl(newPath);

    movedImages.push({
      path: newPath,
      url: data.publicUrl,
    });
  }

  return movedImages;
}
