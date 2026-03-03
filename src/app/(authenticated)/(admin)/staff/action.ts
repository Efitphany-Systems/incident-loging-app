"use server";

import { supabaseAdmin } from "@/lib/supabase/admin-client";
import { supabaseServer } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function getStaffAction() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteStaffAction(id: string) {
  const supabase = await supabaseServer();

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (authError) {
    throw new Error(`Auth delete failed: ${authError.message}`);
  }

  const { error: profileError } = await supabase.from("profiles").delete().eq("id", id);

  if (profileError) {
    throw new Error(`Profile delete failed: ${profileError.message}`);
  }

  revalidatePath("/staff");

  return { success: true };
}
