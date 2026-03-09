"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Venues } from "@/types/venues";
import { TableAction } from "./TableAction";
import Image from "next/image";

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
              <TableHead>Logo</TableHead>
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
                <TableCell>
                  <Image width={50} height={50} src={venue?.logo[0]?.url} alt="logo" />
                </TableCell>
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
            className="bg-card border-border flex items-start rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex">
                <div className="relative mr-4 h-28 w-28 shrink-0 overflow-hidden rounded-lg">
                  {venue.logo && venue.logo.length > 0 ? (
                    <Image src={venue.logo[0].url} alt={venue.name || "Venue Logo"} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="truncate text-lg font-semibold">{venue.name || "—"}</h3>

                  <p className="mt-1 text-sm">{venue.address || "—"}</p>

                  {venue.additional_information && (
                    <p className="mt-2 line-clamp-2 text-xs text-gray-400">{venue.additional_information}</p>
                  )}
                </div>
              </div>
              <hr className="mt-3" />
              <div className="mt-2 flex justify-end">
                <TableAction venueID={venue.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
