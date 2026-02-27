"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormValues, eventSchema } from "@/lib/schema/events";
import { createEventAction } from "@/app/(authenticated)/events/add/action";
import { handleAsync } from "@/lib/form/handleAsync";
import { useRouter } from "next/navigation";

export function useCreateEvent() {
  const router = useRouter();
  const form = useForm<eventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  const createEvent = form.handleSubmit(async (data) => {
    const res = await handleAsync(form, () => createEventAction(data), "Failed to create event");
    if (res.success) {
      form.reset();
      router.push("/events");
    }
  });

  return {
    ...form,
    createEvent,
  };
}
