"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RHFInput } from "@/components/form/RHFInput";
import { FormProvider } from "react-hook-form";
import { useEditVenue } from "@/hooks/use-edit-venue";
import { Venue } from "@/types/venues";
import RHFImageUploader from "@/components/form/RHFImageUpload";
import { RHFTextarea } from "@/components/form/RHFTextarea";

export default function EditVenueForm({ venue }: { venue: Venue }) {
  const form = useEditVenue(venue);

  const {
    control,
    updateVenue,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4 md:shadow-sm">
      <FormProvider {...form}>
        <form onSubmit={updateVenue} className="space-y-5">
          <RHFInput control={control} name="name" label="Venue Name" placeholder="Enter venue name" />
          <RHFInput control={control} name="address" label="Venue Address" placeholder="Enter venue address" />
          <RHFTextarea
            control={control}
            name="additional_information"
            label="Venue additional information"
            placeholder="Enter venue additional information"
          />
          <RHFImageUploader name="logo" maxFiles={1} />
          {errors.root && (
            <p role="alert" className="text-destructive text-center text-sm">
              {errors.root.message}
            </p>
          )}
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="xl" className="w-full lg:w-64" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="animate-spin" /> : "Update Venue"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
}
