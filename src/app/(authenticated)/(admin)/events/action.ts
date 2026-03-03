"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function getEventsAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("events").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export async function getTodaysEventsAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("events").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEventAction(id: string) {
  const supabase = await supabaseServer();
  const { error: profileError } = await supabase.from("events").delete().eq("id", id);

  if (profileError) {
    throw new Error(`Event delete failed: ${profileError.message}`);
  }

  revalidatePath("/events");

  return { success: true };
}
