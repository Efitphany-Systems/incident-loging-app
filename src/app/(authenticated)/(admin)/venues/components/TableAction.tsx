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
import { deleteEventAction } from "../../events/action";

export const TableAction = ({ venueID }: { venueID: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteEventAction(venueID);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center">
      <Button
        disabled={true}
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => router.push(`/venues/${venueID}`)}
      >
        <Edit size={18} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer" disabled={true}>
            <Trash size={18} />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The Event will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={true}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
