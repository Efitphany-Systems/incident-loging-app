import IncidentReportForm from "./components/IncidentReportForm";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="mb-4">
        <h2 className="text-accent-foreground inline-block text-2xl font-bold md:text-3xl">INCIDENT REPORT</h2>
      </div>

      <IncidentReportForm />
    </div>
  );
}
