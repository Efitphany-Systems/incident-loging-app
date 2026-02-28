"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function getIncidentsAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("incidents").select("*");

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
