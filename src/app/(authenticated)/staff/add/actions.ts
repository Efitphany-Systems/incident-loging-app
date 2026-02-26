"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { CreateStaffPayload } from "@/lib/schema/staff";
import { supabaseAdmin } from "@/lib/supabase/admin-client";

export async function createStaffAction(payload: CreateStaffPayload) {
  const supabase = await supabaseServer();
  const { data, error } = await supabaseAdmin.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  const user = data.user;
  if (!error && user) {
    const { error } = await supabase.from("profiles").insert({
      id: user?.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: "staff",
    });
    if (error) {
      throw error;
    }
  }
  if (error) throw new Error(error.message);

  return {
    success: true,
  };
}
