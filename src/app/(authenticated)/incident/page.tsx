import { Card } from "@/components/ui/card";
import { IncidentReportHeaders } from "@/constants/incidents";
import { Users, Sword, Wine, Cross, Megaphone, DoorOpen } from "lucide-react";
import Link from "next/link";

const items = [
  { label: "FIGHT", icon: Users },
  { label: "WEAPON", icon: Sword },
  { label: "INTOXICATION", icon: Wine },
  { label: "MEDICAL ISSUE", icon: Cross },
  { label: "STAFF CALL FOR BACKUP", icon: Megaphone },
  { label: "EJECTION", icon: DoorOpen },
];

export default function IncidentTypeGrid() {
  return (
    <>
      <div className="mb-4 px-4">
        <h2 className="text-accent-foreground inline-block text-2xl font-bold md:text-3xl">
          {IncidentReportHeaders.NewIncidentReport}
        </h2>
      </div>
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 px-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link href={`/incident/${item.label}`} key={"_" + i}>
              <Card
                key={i}
                className="bg-card h-56 cursor-pointer items-center justify-center gap-3 rounded-2xl text-center shadow-lg hover:shadow-xl max-[767px]:h-44 max-[400px]:h-36"
              >
                <Icon className="text-card-foreground h-12 w-12" strokeWidth={3} />
                <span className="text-card-foreground/90 text-xs font-medium tracking-widest">{item.label}</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
