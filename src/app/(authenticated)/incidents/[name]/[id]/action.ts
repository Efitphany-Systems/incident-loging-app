"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { getCurrentProfile } from "@/lib/auth";
import { IncidentPayload } from "@/lib/schema/incident";
import { IncidentImages } from "@/types/incidents";
import { shiftImageFromTemp } from "../../action";
import { Image } from "@/types/common";

export async function updateIncidnetAction(payload: IncidentPayload, ID: string) {
  console.log(ID);
  console.log(payload);

  const supabase = await supabaseServer();
  const user = await getCurrentProfile();

  const images = await updateIncidentImages(payload.eventAndFillerInformation.images ?? []);

  if (!user || user.role !== "admin") {
    throw new Error("Invalid Operation");
  }

  const { medical, law, ...rest } = payload;
  const { error } = await supabase.rpc("update_incident_function", {
    p_incident_id: ID,
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

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}

export async function updateIncidentImages(images: IncidentImages) {
  const [currentIncidentImages, newIncidentImages] = images.reduce<[Image[], Image[]]>(
    (acc, img) => {
      if (img.path?.startsWith("incidents/")) {
        acc[0].push(img);
      } else if (img.path?.startsWith("temp/")) {
        acc[1].push(img);
      }
      return acc;
    },
    [[], []]
  );
  const updatedImages = await shiftImageFromTemp(newIncidentImages);
  return [...currentIncidentImages, ...updatedImages];
}
