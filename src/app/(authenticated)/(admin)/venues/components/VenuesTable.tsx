"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Venues } from "@/types/venues";
import { TableAction } from "./TableAction";

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

                <TableCell aria-disabled="true" className="flex justify-end">
                  <TableAction venueID={venue.id} />
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
            className="bg-card border-border rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Venue Name */}
            <h3 className="truncate text-base font-semibold">{venue.name || "—"}</h3>

            {/* Address */}
            <p className="text-muted-foreground mt-1 truncate text-sm">{venue.address || "—"}</p>

            {/* Additional Info */}
            {venue.additional_information && (
              <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{venue.additional_information}</p>
            )}

            {/* Divider */}
            <div className="border-border my-3 border-t" />

            {/* Actions */}
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
