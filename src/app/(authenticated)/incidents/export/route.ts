import { NextResponse } from "next/server";
import { IncidentFilters } from "@/types/incidents";
import { getIncidentsAction } from "../action";
import { FORMAT_DATE_TIME } from "@/utils/datetime";

export async function generateIncidentsCsv(filters: IncidentFilters) {
  const incidents = await getIncidentsAction(filters);

  console.log(incidents);

  const headers = ["ID", "Event", "Category", "Severity", "Location", "Created At"];

  const rows = incidents.map((i: any) => [
    i.id,
    i.event_name,
    i.category,
    i.severity,
    i.location,
    FORMAT_DATE_TIME(i.created_at),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v ?? ""}"`).join(","))].join("\n");

  return csv;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filters = Object.fromEntries(searchParams.entries());

  const csv = await generateIncidentsCsv(filters as any);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=incidents.csv",
    },
  });
}
