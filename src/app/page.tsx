import Link from "next/link";
import { Card } from "@/components/ui/card";
import { eventInfo, menuItems } from "@/constants/home";

export default function IncidentsPage() {
  return (
    <div className="min-h-dvh flex justify-center bg-background text-foreground py-2">
      <div className="max-w-125 w-full">
        <div className="flex flex-col gap-3 px-3 ">
          <div className="text-center my-3">
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              INCIDENTS
            </h1>
          </div>

          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="border-0 p-6 cursor-pointer transition-colors w-full bg-secondary hover:bg-brand active:bg-brand hover:text-brand-foreground active:text-brand-foreground">
                <div className="text-center">
                  <p className="sm font-semibold">{item.title}</p>
                </div>
              </Card>
            </Link>
          ))}

          <Card className="bg-secondary border-0 p-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <p className="text-lg font-bold text-secondary-foreground">
                  {eventInfo.stage}
                </p>
              </div>
              <p className="text-lg text-muted-foreground">
                {eventInfo.artist}
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl font-bold text-secondary-foreground">
                  {eventInfo.time}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
