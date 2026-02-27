import { getVenuesAction } from "./action";
import VenuesPageHeader from "./components/VenuesPageHeader";
import VenuesTable from "./components/VenuesTable";

export default async function venuesPage() {
  const venues = await getVenuesAction();
  return (
    <div className="mx-auto">
      <VenuesPageHeader />
      <VenuesTable venues={venues} />
    </div>
  );
}
