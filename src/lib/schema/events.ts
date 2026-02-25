import { z } from "zod";

export const eventSchema = z.object({
  venue_id: z.string().min(1, "venue id is required"),
  event_date: z.string("event date is required"),
  start_time: z.string("event start time is required"),
  end_time: z.string("event end time is required"),
  additional_information: z.string("additional information must be a string").optional(),
});

export type eventFormValues = z.infer<typeof eventSchema>;
