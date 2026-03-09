"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";
import { moveImagesFromTempToStorage } from "@/app/(authenticated)/action";

export async function createIncidentAction(payload: IncidentPayload) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();
  if (!user) throw new Error("Invalid Operation");

  const images = await moveImagesFromTempToStorage("incidents", payload.eventAndFillerInformation.images ?? []);

  const { medical, law, ...rest } = payload;

  const { error } = await supabase.rpc("create_incident_function", {
    payload: {
      ...rest,
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      user_phone: user.phone,
      eventAndFillerInformation: {
        ...rest.eventAndFillerInformation,
        images: images,
      },
      ...(medical ? { medical } : {}),
      ...(law ? { law } : {}),
    },
  });

  if (error) throw new Error(error.message);

  return { success: true };
}
