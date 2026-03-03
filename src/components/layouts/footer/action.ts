"use server";

import { supabaseServer } from "@/lib/supabase/server-client";

export async function signOut() {
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return {
    success: true,
  };
}
