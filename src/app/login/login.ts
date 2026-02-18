import { createClient } from "@/lib/supabase/browser-client";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("Error Message: ", error?.message);

  if (error) throw error;

  return data;
}
