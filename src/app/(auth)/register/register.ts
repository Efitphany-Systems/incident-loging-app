import { createClient } from "@/lib/supabase/browser-client";

export async function register(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log("Error Message: ", error?.message);

  if (error) throw error;

  return data;
}
