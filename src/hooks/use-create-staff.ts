"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffFormValues, staffSchema } from "@/lib/schema/staff";

export function useCreateStaff() {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
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
