"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { CreateEventPload } from "@/lib/schema/events";
import { getCurrentProfile } from "@/lib/auth";

export async function updateEventAction(payload: CreateEventPload, ID: string) {
  const supabase = await supabaseServer();
  const user = await getCurrentProfile();
  console.log(user);

  if (user && user.role == "admin") {
    const { error } = await supabase
      .from("events")
      .update({
        name: payload.name,
        venue_id: payload.venue_id,
        event_date: payload.event_date,
        start_time: payload.start_time,
        end_time: payload.end_time,
        additional_information: payload.additional_information,
        created_by: user?.id,
      })
      .eq("id", ID);
    if (error) throw new Error(error.message);

    return {
      success: true,
    };
  } else {
    throw new Error("You do not have permission to perform this action.");
  }
}

export async function getEventByID(id: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  if (error) {
    throw new Error(`Failed to fetch event: ${error.message}`);
  }

  return data;
}
