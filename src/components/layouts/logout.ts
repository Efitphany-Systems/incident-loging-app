import { createClient } from "@/lib/supabase/browser-client";

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  console.log("Error Message: ", error?.message);

  if (error) throw error;

  return { success: true };
}
