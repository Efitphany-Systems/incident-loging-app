"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableAction } from "./TableAction";
import { IncidentFilters, Incidents } from "@/types/incidents";
import { FORMAT_DATE_TIME } from "@/utils/datetime";
import IncidentsFilters from "./IncidentsFilters";
import { IncidentCategories } from "@/types/categories";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser-client";
import { getSeverityColor } from "@/utils/severity";
import { useSearchParams } from "next/navigation";

export default function IncidentsTable({
  role,
  IncidentCategories,
}: {
  role: string;
  IncidentCategories: IncidentCategories;
}) {
  const [incidents, setIncidents] = useState<Incidents>([]);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const filters: IncidentFilters = {
    date: searchParams.get("date") || undefined,
    category: searchParams.get("category") || undefined,
    severity: searchParams.get("severity") || undefined,
  };

  const fetchIncidents = async () => {
    let query = supabase.from("get_incidents_view").select("*");

    if (filters.category) query = query.eq("category", filters.category);
    if (filters.severity) query = query.eq("severity", filters.severity);
    if (filters.date) query = query.eq("created_at", filters.date);

    const { data, error } = await query;
    if (error) console.error(error);
    else setIncidents(data || []);
  };

  useEffect(() => {
    fetchIncidents();
  }, [filters.category, filters.severity, filters.date]);

  return (
    <>
      <IncidentsFilters categories={IncidentCategories} />
      <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-2 md:p-4">
        {/* ===== Desktop Table ===== */}
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {incidents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                    No incidents found
                  </TableCell>
                </TableRow>
              )}

              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">
                    {FORMAT_DATE_TIME(incident.created_at) || <TableCell>{incident.severity || "—"}</TableCell>}
                  </TableCell>
                  <TableCell>{incident.category || <TableCell>{incident.severity || "—"}</TableCell>}</TableCell>
                  <TableCell className="capitalize">{incident.location}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(incident.severity)}`}
                    >
                      {incident.severity || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <TableAction ID={incident.id} category={incident.category} role={role} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ===== Mobile Cards ===== */}
        <div className="space-y-3 md:hidden">
          {incidents.length === 0 && <div className="text-muted-foreground py-8 text-center">No incidents found</div>}

          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-card border-border rounded-xl border p-4 shadow-sm transition hover:shadow-md"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold">{incident.category || "—"}</h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(
                    incident.severity
                  )}`}
                >
                  {incident.severity || "—"}
                </span>
              </div>

              {/* Location */}
              <p className="text-muted-foreground mt-1 text-sm capitalize">{incident.location || "—"}</p>

              {/* Date */}
              <p className="text-muted-foreground mt-1 text-xs">{FORMAT_DATE_TIME(incident.created_at) || "—"}</p>

              {/* Divider */}
              <hr className="mt-3" />

              {/* Actions */}
              <div className="flex justify-end">
                <TableAction ID={incident.id} category={incident.category} role={role} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
