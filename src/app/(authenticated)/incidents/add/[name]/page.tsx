import IncidentPageHeader from "./components/IncidentPageHeader";
import IncidentReportForm from "./components/IncidentReportForm";

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const extractedParams = await params;
  const name = decodeURIComponent(extractedParams.name);
  return (
    <div className="mx-auto">
      <IncidentPageHeader name={name} />
      <IncidentReportForm category={name} />
    </div>
  );
}
