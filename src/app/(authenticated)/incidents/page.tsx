import { IncidentFilters } from "@/types/incidents";
import { getIncidentCategoriesAction } from "./action";
import IncidentsPageHeader from "./components/IncidentsPageHeader";
import IncidentsTable from "./components/IncidentsTable";
import { getCurrentProfile } from "@/lib/auth";

export default async function IncidentsPage({ searchParams }: { searchParams: Promise<IncidentFilters> }) {
  const filters = await searchParams;
  const user = await getCurrentProfile();

  const IncidentCategories = await getIncidentCategoriesAction();
  return (
    <div className="mx-auto">
      <IncidentsPageHeader enabled={true} params={new URLSearchParams(filters as any).toString()} />
      <IncidentsTable IncidentCategories={IncidentCategories} role={user?.role ?? "staff"} />
    </div>
  );
}
