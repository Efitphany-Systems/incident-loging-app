import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  "c-password": z.string().min(6, "Confirm Password must be at least 6 characters"),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
