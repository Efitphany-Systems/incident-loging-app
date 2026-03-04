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

        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-card border-border rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Top Row: Name + Role */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="truncate text-base font-semibold">{member.name || "—"}</h3>

              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getRoleColor(member.role)}`}>
                {member.role}
              </span>
            </div>

            {/* Email */}
            <p className="text-muted-foreground mt-1 truncate text-sm">{member.email || "—"}</p>

            {/* Phone */}
            <p className="text-muted-foreground mt-1 text-xs">{member.phone || "—"}</p>

            {/* Divider */}
            <hr className="mt-3" />

            {/* Actions */}
            <div className="flex justify-end">
              <TableAction staffID={member.id} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
