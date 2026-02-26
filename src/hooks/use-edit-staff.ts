"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStaffFormValues, updateStaffSchema } from "@/lib/schema/staff";
import { useRouter } from "next/navigation";
import { Staff } from "@/types/staff";
import { updateStaffAction } from "@/app/(authenticated)/staff/[id]/actions";

export function useEditStaff(staff: Staff) {
  const router = useRouter();
  const form = useForm<UpdateStaffFormValues>({
    resolver: zodResolver(updateStaffSchema),
    defaultValues: {
      name: staff.name ?? "",
      email: staff.email ?? "",
      phone: staff.phone ?? "",
      password: "",
      cpassword: "",
    },
  });

  const updateStaff = form.handleSubmit(async (data) => {
    try {
      await updateStaffAction(data, staff.id);
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
    updateStaff,
  };
}
