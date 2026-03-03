"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function getVenuesAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("venues").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteVenueAction(id: string) {
  const supabase = await supabaseServer();
  const { error: profileError } = await supabase.from("venues").delete().eq("id", id);

  if (profileError) {
    throw new Error(`Venue delete failed: ${profileError.message}`);
  }

  revalidatePath("/venues");

  return { success: true };
}
