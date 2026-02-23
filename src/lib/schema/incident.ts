import { z } from "zod";

export const witnessSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name required"),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  contactTime: z.string().optional(),
  employmentType: z.enum(["employee", "contractor", "non-employee"]),
});

export const medicalSchema = z.object({
  visibleInjuries: z.enum(["yes", "no"]),
  visibleInjuriesExplain: z.string().optional(),
  medicalAttention: z.enum(["yes", "no"]),
  offeredMedical: z.enum(["yes", "no"]),
  accepted: z.enum(["accepted", "refused"]),
  ambulanceRequested: z.enum(["yes", "no"]),
  ambulanceCompany: z.string().optional(),
  ambulanceEMT: z.string().optional(),
  didPatientLeaveAmbulance: z.enum(["yes", "no"]),
  whereTheyGo: z.string().optional(),
});

export const incidentSchema = z.object({
  eventAndFillerInformation: z.object({
    category: z.string(),
    show: z.string().min(1),
    wearsGlasses: z.enum(["yes", "no"]),
    inUse: z.enum(["yes", "no"]),
  }),

  patronInformation: z.object({
    patronName: z.string().min(1),
    patronPhone: z.string().optional(),
    patronEmail: z.string().email().optional(),
    patronAddress: z.string().optional(),
    patronCityState: z.string().optional(),
    patronContactTime: z.string().optional(),
  }),

  witnesses: z.array(witnessSchema),

  medical: medicalSchema.optional(),
  lawEnforcement: z.any().optional(),
});

export type IncidentFormValues = z.infer<typeof incidentSchema>;
