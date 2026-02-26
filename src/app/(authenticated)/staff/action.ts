"use server";

import { supabaseServer } from "@/lib/supabase/server-client";

export async function getStaffAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);

  return data;
}
