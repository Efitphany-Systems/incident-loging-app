"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { supabaseAdmin } from "@/lib/supabase/admin-client";
import { UpdateUserPayload } from "@/types/staff";
import { UpdateStaffPayload } from "@/lib/schema/staff";

export async function updateStaffAction(payload: UpdateStaffPayload, id: string) {
  const supabase = await supabaseServer();

  const authUpdate: UpdateUserPayload = {
    email: payload.email,
    ...(payload.password ? { password: payload.password } : {}),
  };

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdate);

  if (authError) {
    throw new Error(`Auth update failed: ${authError.message}`);
  }

  if (!authData?.user) {
    throw new Error("Auth user not returned after update");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    })
    .eq("id", id);

  if (profileError) {
    throw new Error(`Profile update failed: ${profileError.message}`);
  }

  return {
    success: true,
  };
}

export async function getStaffByID(id: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

  if (error) {
    throw new Error(`Failed to fetch staff: ${error.message}`);
  }

  return data;
}
