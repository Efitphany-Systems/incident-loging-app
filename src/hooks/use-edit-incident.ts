import { updateIncidnetAction } from "@/app/(authenticated)/incidents/[name]/[id]/action";
import { IncidentFormValues, incidentSchema } from "@/lib/schema/incident";
import { IncidentReport } from "@/types/incidents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useEditIncidentForm(incident: IncidentReport) {
  const router = useRouter();
  const IncedentReportingForm = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      eventAndFillerInformation: {
        category_id: incident.category_id,
        event_id: incident.event_id,
        wears_glasses: incident.reporter?.wears_glasses,
        in_use: incident.reporter?.in_use,
        severity: incident.severity,
        description: incident.description,
        location_id: incident.location_id,
        images: incident.images,
      },
      patron: incident.patron,
      witnesses: incident.witnesses,
      medical: incident.medical,
      law: incident.law,
    },
  });

  const reportIncident = IncedentReportingForm.handleSubmit(async (data: IncidentFormValues) => {
    try {
      console.log(data);

      const response = await updateIncidnetAction(data, incident.id);
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

  return { ...IncedentReportingForm, reportIncident };
}
