import Link from "next/link";
import { Card } from "@/components/ui/card";
import { IncidentCategories } from "@/constants/incidents";

const IncidentCategorySelector = () => {
  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 px-4">
      {IncidentCategories.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link href={`/incidents/add/${item.label}`} key={"_" + i}>
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
  );
};

export default IncidentCategorySelector;
