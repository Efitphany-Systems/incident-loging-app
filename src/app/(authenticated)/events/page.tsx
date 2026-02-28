import EventsPageHeader from "./components/EventsPageHeader";
import { getEventsAction } from "./action";
import EventsTable from "./components/EventsTable";

export default async function EventsPage() {
  const events = await getEventsAction();
  return (
    <div className="mx-auto">
      <EventsPageHeader />
      <EventsTable events={events} />
    </div>
  );
}
