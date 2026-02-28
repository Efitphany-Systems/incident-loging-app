import { getIncidentsAction } from "./action";
import IncidentsPageHeader from "./components/IncidentsPageHeader";
import IncidentsTable from "./components/IncidentsTable";

export default async function IncidentsPage() {
  const allIncidents = await getIncidentsAction();
  return (
    <div className="mx-auto">
      <IncidentsPageHeader />
      <IncidentsTable incidents={allIncidents} />
    </div>
  );
}
