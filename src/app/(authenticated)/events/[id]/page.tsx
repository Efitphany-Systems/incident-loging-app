import PageHeader from "@/components/layouts/PageHeader";
import EditEventForm from "./EditEventForm";
import { getVenuesAction } from "../../venues/action";
import { getEventByID } from "./action";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const extractedParams = await params;

  const venues = await getVenuesAction();
  const event = await getEventByID(extractedParams.id);
  return (
    <div className="mx-auto">
      <PageHeader name="Create New Event" />
      <EditEventForm venues={venues} event={event} />
    </div>
  );
}
