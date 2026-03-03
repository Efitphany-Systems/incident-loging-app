import { getTodaysEventsAction } from "@/app/(authenticated)/(admin)/events/action";
import IncidentReportForm from "./components/IncidentReportForm";
import AddEditIncidentPageHeader from "../../../components/AddEditIncidentPageHeader";
import { getLocationsByVenueAction } from "../../../action";

export default async function Page({ params }: { params: Promise<{ name: string; id: string }> }) {
  const extractedParams = await params;
  const name = decodeURIComponent(extractedParams.name);

  const events = await getTodaysEventsAction();
  /**
   * TODO
   * ** venue is single now so in future we will pass selected vanue from here
   * ** this current id is not used in handler
   */
  const locations = await getLocationsByVenueAction("37c21a57-fbe8-4641-8213-411a281827db");

  return (
    <div className="mx-auto">
      <AddEditIncidentPageHeader name={name} />
      <IncidentReportForm category_id={extractedParams.id} events={events} locations={locations} />
    </div>
  );
}
