import { z } from "zod";

const eventAndFillerInformation = z.object({
  category: z.string(),
  show: z.string().min(10, "Please select a show."),
  wearsGlasses: z.enum(["yes", "no"]),
  inUse: z.enum(["yes", "no"]),
});

const patronInformation = z.object({
  name: z.string("Enter a valid name"),
  phone: z.string("Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  address: z.string("Enter street address"),
  cityState: z.string("Enter city, state, and zip code"),
  contactTime: z.string("Enter preferred contact time"),
});

const witnessSchema = z.object({
  name: z.string("Enter a valid name").min(3, "Name should be at least 3 characters"),
  phone: z.string("Enter a valid phone number").min(10, "Phone number should be at least 10 digits"),
  email: z.email("Enter a valid email address"),
  contactTime: z.string().min(1, "Enter preferred contact time"),
  employmentType: z.enum(["employee", "non employee"]),
});

export const medicalSchema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    if (data.visibleInjuries === "yes" && !data.visibleInjuriesExplain?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["visibleInjuriesExplain"],
        message: "Please describe the visible injuries.",
      });
    }

    if (data.ambulanceRequested === "yes") {
      if (!data.ambulanceCompany?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["ambulanceCompany"],
          message: "Ambulance company is required when ambulance is requested.",
        });
      }

      if (!data.ambulanceEMT?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["ambulanceEMT"],
          message: "EMT information is required when ambulance is requested.",
        });
      }
    }
  });

const lawEnforcementSchema = z.object({
  contacted: z.enum(["yes", "no"]),
  explanation: z.string().optional(),
  reportWritten: z.enum(["yes", "no"]),
  reportNumber: z.string().optional(),
  citation: z.string("Enter citation or charge info").optional(),
  officerName: z.string().optional(),
});

export const incidentSchema = z.object({
  eventAndFillerInformation: eventAndFillerInformation,
  patronInformation: patronInformation,
  witnesses: z.array(witnessSchema),
  medical: medicalSchema.optional(),
  lawEnforcement: lawEnforcementSchema.optional(),
});

export type IncidentFormValues = z.infer<typeof incidentSchema>;
export type Medical = z.infer<typeof medicalSchema>;
export type LawEnforcement = z.infer<typeof lawEnforcementSchema>;
