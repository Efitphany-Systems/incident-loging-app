import { IncidentFilters } from "@/types/incidents";
import { getIncidentCategoriesAction, getIncidentsAction } from "./action";
import IncidentsFilters from "./components/IncidentsFilters";
import IncidentsPageHeader from "./components/IncidentsPageHeader";
import IncidentsTable from "./components/IncidentsTable";

export default async function IncidentsPage({ searchParams }: { searchParams: Promise<IncidentFilters> }) {
  const filters = await searchParams;
  const allIncidents = await getIncidentsAction(filters);
  const IncidentCategories = await getIncidentCategoriesAction();
  return (
    <div className="mx-auto">
      <IncidentsPageHeader />
      <IncidentsFilters categories={IncidentCategories} />
      <IncidentsTable incidents={allIncidents} />
    </div>
  );
}
