import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignInPayload = z.infer<typeof signInSchema>;
