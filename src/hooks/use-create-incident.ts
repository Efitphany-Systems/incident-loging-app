import { createIncidentAction } from "@/app/(authenticated)/incidents/add/[name]/[id]/action";
import { IncidentFormValues, incidentSchema } from "@/lib/schema/incident";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useCreateIncidentForm(category_id: string) {
  const router = useRouter();
  const IncedentReportingForm = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      eventAndFillerInformation: {
        category_id: category_id,
        event_id: "",
        wears_glasses: true,
        in_use: true,
        severity: "low",
        description: "",
        images: [],
      },
      witnesses: [],
      medical: null,
      law: null,
    },
  });

  const form = IncedentReportingForm.handleSubmit(async (data: IncidentFormValues) => {
    try {
      console.log(data);

      const response = await createIncidentAction(data);
      if (response.success) {
        IncedentReportingForm.reset();
        router.replace("/incidents");
      }
    } catch (e) {
      IncedentReportingForm.setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  });

  return { ...IncedentReportingForm, form };
}
