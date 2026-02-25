"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

type Staff = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: "admin" | "staff" | "supervisor";
};

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

            {staff.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name || "—"}</TableCell>

                <TableCell>{user.email || "—"}</TableCell>

                <TableCell className="capitalize">{user.role}</TableCell>

                <TableCell>{user.phone || "—"}</TableCell>

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

      {/* ===== Mobile Cards ===== */}
      <div className="space-y-3 md:hidden">
        {staff.length === 0 && <div className="text-muted-foreground py-8 text-center">No staff found</div>}

        {staff.map((user) => (
          <div
            key={user.id}
            className="border-border bg-muted/30 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
          >
            {/* Left */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-3">
                <span className="truncate font-semibold">{user.name || "—"}</span>

                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>

              <p className="text-muted-foreground truncate text-sm">{user.email || "—"}</p>

              <p className="text-muted-foreground text-xs">{user.phone || "—"}</p>
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
