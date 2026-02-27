import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/server-client";

export const getCurrentProfile = cache(async () => {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, name, role")
    .eq("id", user.id)
    .single();

  if (profileError) return null;

  return profile;
});
