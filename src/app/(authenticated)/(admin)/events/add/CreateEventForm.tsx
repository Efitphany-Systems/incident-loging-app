"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RHFInput } from "@/components/form/RHFInput";
import { RHFSelect } from "@/components/form/RHFSelect";
import { RHFDatePicker } from "@/components/form/RHFDate";
import { useCreateEvent } from "@/hooks/use-create-event";
import { FormProvider } from "react-hook-form";
import { Venues } from "@/types/venues";
import { RHFTimePicker } from "@/components/form/RHFTime";
import { RHFTextarea } from "@/components/form/RHFTextarea";

export default function CreateEventForm({ venues }: { venues: Venues }) {
  const form = useCreateEvent();

  const {
    control,
    createEvent,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4 md:shadow-sm">
      <FormProvider {...form}>
        <form onSubmit={createEvent} className="space-y-5">
          <RHFSelect
            control={control}
            name="venue_id"
            label="Venue"
            placeholder="Select venue"
            options={venues.map((venue) => ({ label: venue.name, value: venue.id }))}
          />

          <RHFInput control={control} name="name" label="Event title" placeholder="Enter event title" />

          <RHFDatePicker control={control} name="event_date" label="Event Date" placeholder="YYYY-MM-DD" />

          <RHFTimePicker control={control} name="start_time" label="Start Time" placeholder="HH:mm" />

          <RHFTimePicker control={control} name="end_time" label="End Time" placeholder="HH:mm" />

          <RHFTextarea
            control={control}
            name="additional_information"
            label="Additional Information"
            placeholder="Enter notes"
          />

          {errors.root && (
            <p role="alert" className="text-destructive text-center text-sm">
              {errors.root.message}
            </p>
          )}
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="xl" className="w-full lg:w-64" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="animate-spin" /> : "Create Event"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
}
