import Link from "next/link";
import { Card } from "@/components/ui/card";
import { eventInfo, menuItems } from "@/constants/home";

export default function IncidentsPage() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh justify-center py-2">
      <div className="w-full max-w-125">
        <div className="flex flex-col gap-3 px-3">
          <div className="my-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance">INCIDENTS</h1>
          </div>

          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="bg-secondary hover:bg-brand active:bg-brand hover:text-brand-foreground active:text-brand-foreground w-full cursor-pointer border-0 p-6 transition-colors">
                <div className="text-center">
                  <p className="sm font-semibold">{item.title}</p>
                </div>
              </Card>
            </Link>
          ))}

          <Card className="bg-secondary border-0 p-6">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-secondary-foreground text-lg font-bold">{eventInfo.stage}</p>
              </div>
              <p className="text-muted-foreground text-lg">{eventInfo.artist}</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-secondary-foreground text-xl font-bold">{eventInfo.time}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
