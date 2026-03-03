"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";

export async function createIncidentAction(payload: IncidentPayload) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();

  const { medical, law, ...rest } = payload;

  if (user && user.role == "admin") {
    const { error } = await supabase.rpc("create_incident_function", {
      payload: {
        ...rest,
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        user_phone: user.phone,
        ...(medical ? { medical } : {}),
        ...(law ? { law } : {}),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
    };
  } else {
    throw new Error("Invalid Operation");
  }
}
