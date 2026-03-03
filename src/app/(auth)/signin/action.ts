"use server";

import { SignInPayload } from "@/lib/schema/signin";
import { supabaseServer } from "@/lib/supabase/server-client";

export async function signin(payload: SignInPayload) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  if (error) throw error;
  return data;
}
