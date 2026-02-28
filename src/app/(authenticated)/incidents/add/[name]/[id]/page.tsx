import { getTodaysEventsAction } from "@/app/(authenticated)/events/action";
import IncidentPageHeader from "./components/IncidentPageHeader";
import IncidentReportForm from "./components/IncidentReportForm";

export default async function Page({ params }: { params: Promise<{ name: string; id: string }> }) {
  const extractedParams = await params;
  const name = decodeURIComponent(extractedParams.name);

  const events = await getTodaysEventsAction();
  return (
    <div className="mx-auto">
      <IncidentPageHeader name={name} />
      <IncidentReportForm category={extractedParams.id} events={events} />
    </div>
  );
}
