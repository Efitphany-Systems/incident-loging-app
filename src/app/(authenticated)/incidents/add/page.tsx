import PageHeader from "@/components/layouts/PageHeader";
import { IncidentReportHeaders } from "@/constants/incidents";
import IncidentCategorySelector from "./IncidentCategorySelector";

export default function IncidentTypeGrid() {
  return (
    <>
      <PageHeader name={IncidentReportHeaders.NewIncidentReport} />
      <IncidentCategorySelector />
    </>
  );
}
