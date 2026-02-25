import IncidentsPageHeader from "./components/IncidentsPageHeader";
import IncidentsTable, { IncidentsDummy } from "./components/IncidentsTable";

const recentIncidents: IncidentsDummy[] = [
  { id: "1", time: "9:47 PM", type: "Fight", location: "Main Stage", severity: "High" },
  { id: "2", time: "9:38 PM", type: "Intoxication", location: "Bar Right", severity: "Medium" },
  { id: "3", time: "9:22 PM", type: "Medical", location: "Entry", severity: "High" },
  { id: "4", time: "9:15 PM", type: "Ejection", location: "Bar Left", severity: "Low" },
  { id: "5", time: "9:03 PM", type: "Backup Call", location: "Main Stage", severity: "High" },
];

const page = () => {
  return (
    <div className="mx-auto">
      <IncidentsPageHeader />
      <IncidentsTable incidents={recentIncidents} />
    </div>
  );
};

export default page;
