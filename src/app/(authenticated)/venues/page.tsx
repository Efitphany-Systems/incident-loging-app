import VenuesPageHeader from "./components/VenuesPageHeader";
import VenuesTable, { VenueDummy } from "./components/VenuesTable";

export const events: VenueDummy[] = [
  {
    id: "e1",
    name: "Event Space",
    address: "Johar town lahore pakistan",
    additional_information: "Some information will be here",
    created_at: "2026-02-01T09:00:00Z",
    updated_at: "2026-02-01T09:00:00Z",
  },
];

const page = () => {
  return (
    <div className="mx-auto">
      <VenuesPageHeader />
      <VenuesTable events={events} />
    </div>
  );
};

export default page;
