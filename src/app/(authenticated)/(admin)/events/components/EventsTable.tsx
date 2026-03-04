"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableAction } from "./TableAction";
import { Events } from "@/types/events";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTimeRange(start?: string | null, end?: string | null) {
  if (!start && !end) return "—";
  if (start && end) return `${start} - ${end}`;
  return start || end || "—";
}

export default function EventsTable({ events }: { events: Events }) {
  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4">
      {/* ===== Desktop ===== */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {events.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                  No events found
                </TableCell>
              </TableRow>
            )}

            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>

                <TableCell>{formatDate(event.event_date)}</TableCell>

                <TableCell>{formatTimeRange(event.start_time, event.end_time)}</TableCell>

                <TableCell className="flex justify-end">
                  <TableAction eventID={event.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ===== Mobile ===== */}
      <div className="space-y-3 md:hidden">
        {events.length === 0 && <div className="text-muted-foreground py-8 text-center">No events found</div>}

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-card border-border rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Event Name */}
            <h3 className="truncate text-base font-semibold">{event.name || "—"}</h3>

            {/* Date */}
            <p className="text-muted-foreground mt-1 text-sm">{formatDate(event.event_date) || "—"}</p>

            {/* Time Range */}
            <p className="text-muted-foreground mt-1 text-xs">
              {formatTimeRange(event.start_time, event.end_time) || "—"}
            </p>

            {/* Divider */}
            <hr className="mt-3" />

            {/* Actions */}
            <div className="flex justify-end">
              <TableAction eventID={event.id} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
