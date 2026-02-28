"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";

export async function createIncidentAction(payload: IncidentPayload) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();
  if (user && user.role == "admin") {
    const { error } = await supabase.from("incidents").insert({
      name: payload.eventAndFillerInformation,
    });
    if (error) throw new Error(error.message);

    return {
      success: true,
    };
  } else {
    throw new Error("Invalid Operation");
  }
}
