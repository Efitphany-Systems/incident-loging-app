import { getIncidentByIDAction } from "../../action";
import IncidentReportDisplay from "./IncidentReportDisplay";

export default async function IncidentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const extractedParams = await params;
  const incidentData = await getIncidentByIDAction(extractedParams.id);
  console.log(incidentData);

  return <IncidentReportDisplay data={incidentData} />;
}
