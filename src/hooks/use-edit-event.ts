"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormValues, eventSchema } from "@/lib/schema/events";
import { handleAsync } from "@/lib/form/handleAsync";
import { Event } from "@/types/events";
import { updateEventAction } from "@/app/(authenticated)/events/[id]/action";
import { useRouter } from "next/navigation";

export function useEditEvent(event: Event) {
  const router = useRouter();
  const form = useForm<eventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event.name,
      venue_id: event.venue_id,
      event_date: event.event_date,
      start_time: event.start_time ?? "",
      end_time: event.end_time ?? "",
      additional_information: event.additional_information ?? "",
    },
  });

  const updateEvent = form.handleSubmit(async (data) => {
    const res = await handleAsync(form, () => updateEventAction(data, event.id), "Failed to update event");
    if (res.success) {
      form.reset();
      router.push("/events");
    }
  });

  return {
    ...form,
    updateEvent,
  };
}
