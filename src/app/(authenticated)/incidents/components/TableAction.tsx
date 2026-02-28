"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
import { deleteIncidentsAction } from "../action";

export const TableAction = ({ ID }: { ID: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteIncidentsAction(ID);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => router.push(`/incidents/${ID}`)}>
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
            <AlertDialogTitle>Delete Incident?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The Incident will be permanently removed.
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
