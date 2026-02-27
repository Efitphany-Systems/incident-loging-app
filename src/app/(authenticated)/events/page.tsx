import EventsPageHeader from "./components/EventsPageHeader";
import { getEventsAction } from "./action";
import EventsTable from "./components/EventsTable";

const page = async () => {
  const events = await getEventsAction();
  return (
    <div className="mx-auto">
      <EventsPageHeader />
      <EventsTable events={events} />
    </div>
  );
};

export default page;
