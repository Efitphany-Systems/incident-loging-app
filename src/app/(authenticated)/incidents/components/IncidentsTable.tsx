"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableAction } from "./TableAction";
import { Incidents } from "@/types/incidents";
import { FORMAT_DATE_TIME } from "@/utils/datetime";

function getSeverityColor(severity?: string | null) {
  switch (severity?.toLowerCase()) {
    case "high":
      return "bg-red-500/50 text-card-forground";
    case "medium":
      return "bg-yellow-500/50 text-card-forground";
    case "low":
      return "bg-green-500/50 text-card-forground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function IncidentsTable({ incidents, role }: { incidents: Incidents; role: string }) {
  return (
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
  );
}
