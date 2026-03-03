"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";

export async function updateIncidnetAction(payload: IncidentPayload, ID: string) {
  console.log(ID);
  console.log(payload);

  const supabase = await supabaseServer();
  const user = await getCurrentProfile();

  if (user && user.role == "admin") {
    const { medical, law, ...rest } = payload;
    const { error } = await supabase.rpc("update_incident_function", {
      p_incident_id: ID,
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
