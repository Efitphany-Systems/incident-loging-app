import { z } from "zod";

const imageSchema = z.object({
  url: z.url(),
  path: z.string(),
});

export const updateVenueSchema = z.object({
  name: z.string().min(3, "venue name is required"),
  address: z.string("venue address is required"),
  additional_information: z.string("venue address is required").optional(),
  logo: z.array(imageSchema),
});

export type UpdateVenueFormValues = z.infer<typeof updateVenueSchema>;
export type UpdateVenuePload = z.infer<typeof updateVenueSchema>;
