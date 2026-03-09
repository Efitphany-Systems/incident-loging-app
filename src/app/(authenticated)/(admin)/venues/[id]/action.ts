"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { UpdateVenuePload } from "@/lib/schema/venus";
import { getCurrentProfile } from "@/lib/auth";
import { moveImagesFromTempToStorage } from "@/app/(authenticated)/action";

export async function updateVenueAction(payload: UpdateVenuePload, id: string) {
  const supabase = await supabaseServer();

  const user = await getCurrentProfile();
  if (!user || user.role !== "admin") throw new Error("Invalid Operation");

  const logo = await moveImagesFromTempToStorage("logos", payload.logo);

  const { error } = await supabase
    .from("venues")
    .update({
      name: payload.name,
      address: payload.address,
      logo: logo ?? {},
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Venue update failed: ${error.message}`);
  }

  return {
    success: true,
  };
}

export async function getVenueByID(ID: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("venues").select("*").eq("id", ID).single();
  if (error) {
    throw new Error(`Failed to fetch venue: ${error.message}`);
  }

  return data;
}
