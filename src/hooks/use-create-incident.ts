import { IncidentFormValues, incidentSchema } from "@/lib/schema/incident";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useIncidentForm(initialCategory: string) {
  const router = useRouter();
  const IncedentReportingForm = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      eventAndFillerInformation: {
        category: initialCategory,
        show: "",
        wearsGlasses: "no",
        inUse: "yes",
      },
      witnesses: [],
      medical: undefined,
      lawEnforcement: undefined,
    },
  });

  const reportIncident = IncedentReportingForm.handleSubmit(async (data: IncidentFormValues) => {
    try {
      console.log("working fine!");

      console.log(data);
      router.replace("/todays-incidents");
    } catch (e) {
      IncedentReportingForm.setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  });

  return { ...IncedentReportingForm, reportIncident };
}
