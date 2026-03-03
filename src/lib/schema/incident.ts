import { z } from "zod";

const eventAndFillerInformation = z.object({
  category_id: z.string(),
  event_id: z.string().min(10, "Please select a show."),
  wears_glasses: z.boolean("please select a value from it"),
  in_use: z.boolean("please select a value from it"),
  severity: z.enum(["low", "medium", "high"]),
  description: z.string().optional(),
  location_id: z.string().min(1, "Please select a location."),
});

const patronInformation = z.object({
  name: z.string("Enter a valid name"),
  phone: z.string("Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  gender: z.string("Select a gender"),
  age: z.number("Enter a valid age in numbers between 1-99"),
  contact_time: z.string("Enter preferred contact time"),
  address_street: z.string("Enter street address"),
  address_city: z.string("Enter city, state, and zip code"),
});

const witnessSchema = z.object({
  name: z.string("Enter a valid name").min(3, "Name should be at least 3 characters"),
  phone: z.string("Enter a valid phone number").min(10, "Phone number should be at least 10 digits"),
  email: z.email("Enter a valid email address"),
  contact_time: z.string().min(1, "Enter preferred contact time"),
  employee: z.boolean("please select a value from it"),
});

export const medicalSchema = z
  .object({
    visible_injuries: z.boolean("please select a value from it"),
    injury_explanation: z.string().optional(),

    medical_attention_apparent: z.boolean("please select a value from it"),
    medical_services_offered: z.boolean("please select a value from it"),
    medical_services_accepted: z.boolean("please select a value from it"),

    ambulance_requested: z.boolean("please select a value from it"),
    ambulance_company: z.string().optional(),
    emt_name_or_number: z.string().optional(),

    patron_left_in_ambulance: z.boolean("please select a value from it"),
    destination: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.visible_injuries && !data.injury_explanation?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["injury_explanation"],
        message: "Please describe the visible injuries.",
      });
    }

    if (data.ambulance_requested) {
      if (!data.ambulance_company?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["ambulance_company"],
          message: "Ambulance company is required when ambulance is requested.",
        });
      }

      if (!data.emt_name_or_number?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["emt_name_or_number"],
          message: "EMT information is required when ambulance is requested.",
        });
      }
    }
  });

const lawEnforcementSchema = z.object({
  law_enforcement_contacted: z.boolean("please select a value from it"),
  contact_explanation: z.string().optional(),
  police_report_written: z.boolean("please select a value from it"),
  police_report_number: z.string().optional(),
  citation_or_charge_or_arrest: z.string("Enter citation or charge info").optional(),
  officer_name_badge: z.string().optional(),
});

export const incidentSchema = z.object({
  eventAndFillerInformation: eventAndFillerInformation,
  patron: patronInformation,
  witnesses: z.array(witnessSchema),
  medical: medicalSchema.nullable(),
  law: lawEnforcementSchema.nullable(),
});

export type IncidentFormValues = z.infer<typeof incidentSchema>;
export type IncidentPayload = z.infer<typeof incidentSchema>;
export type Medical = z.infer<typeof medicalSchema>;
export type LawEnforcement = z.infer<typeof lawEnforcementSchema>;
