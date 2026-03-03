"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteStaffAction } from "./action";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";

export const TableAction = ({ staffID }: { staffID: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteStaffAction(staffID);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => router.push(`/staff/${staffID}`)}>
        <Edit size={18} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer" disabled={isPending}>
            <Trash size={18} />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete staff?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The staff account will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
