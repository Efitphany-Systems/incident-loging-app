"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Venues } from "@/types/venues";

export default function VenuesTable({ venues }: { venues: Venues }) {
  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4">
      {/* ===== Desktop ===== */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Additional Information</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {venues.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                  No venue found
                </TableCell>
              </TableRow>
            )}

            {venues.map((venue) => (
              <TableRow key={venue.id}>
                <TableCell className="font-medium">{venue.name}</TableCell>

                <TableCell>{venue.address}</TableCell>
                <TableCell>{venue.additional_information}</TableCell>

                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ===== Mobile ===== */}
      <div className="space-y-3 md:hidden">
        {venues.length === 0 && <div className="text-muted-foreground py-8 text-center">No venues found</div>}

        {venues.map((venue) => (
          <div
            key={venue.id}
            className="border-border bg-muted/30 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
          >
            {/* Left */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 truncate font-semibold">{venue.name}</div>
              <div className="text-muted-foreground text-sm">{venue.address}</div>
              <div className="text-muted-foreground text-sm">{venue.additional_information}</div>
            </div>

            {/* Actions */}
            <Button variant="ghost" size="icon" className="ml-2 rounded-full">
              <MoreVertical size={18} />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
