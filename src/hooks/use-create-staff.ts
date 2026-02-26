"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStaffFormValues, staffSchema } from "@/lib/schema/staff";
import { createStaffAction } from "@/app/(authenticated)/staff/add/actions";
import { useRouter } from "next/navigation";

export function useCreateStaff() {
  const router = useRouter();
  const form = useForm<CreateStaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
  });

  const createStaff = form.handleSubmit(async (data) => {
    try {
      await createStaffAction(data);
      router.push("/staff");
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
