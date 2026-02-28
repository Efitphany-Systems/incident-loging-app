"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableAction } from "./TableAction";
import { Incidents } from "@/types/incidents";

function getSeverityColor(severity?: string | null) {
  switch (severity?.toLowerCase()) {
    case "high":
      return "bg-red-500/15 text-red-400";
    case "medium":
      return "bg-yellow-500/15 text-yellow-400";
    case "low":
      return "bg-green-500/15 text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function IncidentsTable({ incidents }: { incidents: Incidents }) {
  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4">
      {/* ===== Desktop Table ===== */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
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
                <TableCell className="font-medium">{incident.time || "—"}</TableCell>
                <TableCell>{incident.type || "—"}</TableCell>
                <TableCell className="capitalize">{incident.location}</TableCell>
                <TableCell>{incident.severity || "—"}</TableCell>
                <TableCell className="flex justify-end">
                  <TableAction ID={incident.id} />
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
            className="border-border bg-muted/30 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
          >
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                <span className="font-semibold">{incident.type || "—"}</span>
                <span className="text-muted-foreground text-xs">{incident.time || "—"}</span>
              </div>

              <p className="text-muted-foreground text-sm capitalize">{incident.location || "—"}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                {incident.severity || "—"}
              </span>

              <TableAction ID={incident.id} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
