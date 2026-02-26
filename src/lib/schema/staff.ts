import { z } from "zod";

/** -------------------------
 * Base fields
 * ------------------------*/
const staffBaseFields = {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
};

/** -------------------------
 * Password fields
 * ------------------------*/
const passwordFields = {
  password: z.string().min(6, "Password must be at least 6 characters"),
  cpassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
};

/** -------------------------
 * Password rule
 * ------------------------*/
const passwordsMatch = (data: { password?: string; cpassword?: string }) => {
  if (!data.password && !data.cpassword) return true;
  if (!data.password || !data.cpassword) return false;
  return data.password === data.cpassword;
};

/** -------------------------
 * Create schema
 * ------------------------*/
export const createStaffSchema = z
  .object({
    ...staffBaseFields,
    ...passwordFields,
  })
  .refine(passwordsMatch, {
    message: "Passwords must match",
    path: ["cpassword"],
  });

/** -------------------------
 * Update schema
 * ------------------------*/
export const updateStaffSchema = z
  .object({
    ...staffBaseFields,
    password: passwordFields.password.or(z.literal("")).optional(),
    cpassword: passwordFields.cpassword.or(z.literal("")).optional(),
  })
  .refine(passwordsMatch, {
    message: "Passwords must match",
    path: ["cpassword"],
  });

/** -------------------------
 * Public Staff (API/UI)
 * ------------------------*/
export const staffSchema = z.object({
  id: z.string(),
  ...staffBaseFields,
});

export type Staff = z.infer<typeof staffSchema>;

/** -------------------------
 * Form / Input Types
 * ------------------------*/
export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;
export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;

/** -------------------------
 * Payload Types (without cpassword)
 * ------------------------*/
export type CreateStaffPayload = Omit<CreateStaffFormValues, "cpassword">;
export type UpdateStaffPayload = Omit<UpdateStaffFormValues, "cpassword">;
