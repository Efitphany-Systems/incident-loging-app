"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { CreateEventPload } from "@/lib/schema/events";
import { getCurrentProfile } from "@/lib/auth";

export async function createEventAction(payload: CreateEventPload) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();
  if (user && user.role == "admin") {
    const { error } = await supabase.from("events").insert({
      name: payload.name,
      venue_id: payload.venue_id,
      event_date: payload.event_date,
      start_time: payload.start_time,
      end_time: payload.end_time,
      additional_information: payload.additional_information,
      created_by: user?.id,
    });
    if (error) throw new Error(error.message);

    return {
      success: true,
    };
  } else {
    throw new Error("Invalid Operation");
  }
}
