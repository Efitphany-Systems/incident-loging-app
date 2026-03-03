import PageHeader from "@/components/layouts/PageHeader";
import CreateEventForm from "./CreateEventForm";
import { getVenuesAction } from "../../venues/action";

export default async function AddEventsPage() {
  const venues = await getVenuesAction();
  return (
    <div className="mx-auto">
      <PageHeader name="Create New Event" />
      <CreateEventForm venues={venues} />
    </div>
  );
}
