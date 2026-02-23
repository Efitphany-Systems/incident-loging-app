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

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  console.log("Error Message: ", error?.message);

  if (error) throw error;

  return { success: true };
}
