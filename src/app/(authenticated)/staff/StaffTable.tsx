"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableAction } from "./TableAction";
import { Staff } from "@/types/staff";

function getRoleColor(role: Staff["role"]) {
  switch (role) {
    case "admin":
      return "bg-red-500/15 text-red-400";
    case "supervisor":
      return "bg-blue-500/15 text-blue-400";
    case "staff":
      return "bg-green-500/15 text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function StaffTable({ staff }: { staff: Staff[] }) {
  return (
    <Card className="md:bg-card text-card-foreground h-full space-y-1 border-0 bg-transparent p-4">
      {/* ===== Desktop Table ===== */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {staff.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                  No staff found
                </TableCell>
              </TableRow>
            )}

            {staff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name || "—"}</TableCell>

                <TableCell>{staff.email || "—"}</TableCell>

                <TableCell className="capitalize">{staff.role}</TableCell>

                <TableCell>{staff.phone || "—"}</TableCell>

                <TableCell className="flex justify-end">
                  <TableAction staffID={staff.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="space-y-3 md:hidden">
        {staff.length === 0 && <div className="text-muted-foreground py-8 text-center">No staff found</div>}

        {staff.map((staff) => (
          <div
            key={staff.id}
            className="border-border bg-muted/30 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
          >
            {/* Left */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-3">
                <span className="truncate font-semibold">{staff.name || "—"}</span>

                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getRoleColor(staff.role)}`}>
                  {staff.role}
                </span>
              </div>

              <p className="text-muted-foreground truncate text-sm">{staff.email || "—"}</p>

              <p className="text-muted-foreground text-xs">{staff.phone || "—"}</p>
            </div>

            {/* Actions */}
            <TableAction staffID={staff.id} />
          </div>
        ))}
      </div>
    </Card>
  );
}
