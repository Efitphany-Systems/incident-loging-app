import { IncidentFilters } from "@/types/incidents";
import { getIncidentCategoriesAction, getIncidentsAction } from "./action";
import IncidentsFilters from "./components/IncidentsFilters";
import IncidentsPageHeader from "./components/IncidentsPageHeader";
import IncidentsTable from "./components/IncidentsTable";
import { getCurrentProfile } from "@/lib/auth";

export default async function IncidentsPage({ searchParams }: { searchParams: Promise<IncidentFilters> }) {
  const filters = await searchParams;
  const user = await getCurrentProfile();

  const allIncidents = await getIncidentsAction(filters);
  const IncidentCategories = await getIncidentCategoriesAction();
  return (
    <div className="mx-auto">
      <IncidentsPageHeader
        enabled={Boolean(allIncidents?.length)}
        params={new URLSearchParams(filters as any).toString()}
      />
      <IncidentsFilters categories={IncidentCategories} />
      <IncidentsTable incidents={allIncidents} role={user?.role ?? "staff"} />
    </div>
  );
}
