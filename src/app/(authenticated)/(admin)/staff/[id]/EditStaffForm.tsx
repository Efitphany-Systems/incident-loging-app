"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { RHFInput } from "@/components/form/RHFInput";
import { Card } from "@/components/ui/card";
import { useEditStaff } from "@/hooks/use-edit-staff";
import { Staff } from "@/types/staff";

export default function EditStaffForm({ staff }: { staff: Staff }) {
  const {
    control,
    updateStaff,
    formState: { errors, isSubmitting },
  } = useEditStaff(staff);

  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4">
      <form onSubmit={updateStaff} className="space-y-5">
        <RHFInput control={control} name="name" label="Full Name" placeholder="Enter staff name" />

        <RHFInput control={control} name="email" label="Email" placeholder="staff@example.com" />

        <RHFInput control={control} name="phone" label="Phone" placeholder="Enter phone number" />

        <RHFInput
          control={control}
          name="password"
          label="Password (Emter to update)"
          placeholder="Enter password number"
        />

        <RHFInput
          control={control}
          name="cpassword"
          label="Confirm Password"
          placeholder="Enter confirm password number"
        />

        {errors.root && (
          <p role="alert" className="text-destructive text-center text-sm">
            {errors.root.message}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="xl" className="w-full lg:w-64" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : "Update Staff"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
