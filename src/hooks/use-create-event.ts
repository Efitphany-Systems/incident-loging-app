"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormValues, eventSchema } from "@/lib/schema/events";

export function useCreateEvent() {
  const form = useForm<eventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  const createStaff = form.handleSubmit(async (data) => {
    try {
      await fetch("/api/staff", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          role: "staff",
        }),
      });
    } catch (e) {
      form.setError("root", {
        type: "server",
        message: "Failed to create staff",
      });
    }
  });

  return {
    ...form,
    createStaff,
  };
}
