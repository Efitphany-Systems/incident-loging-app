"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NotificationPermissionAlert({ role }: { role: string }) {
  const [open, setOpen] = useState(false);

  async function requestPermission() {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        setOpen(false);
      }
    }
  }

  useEffect(() => {
    if (role === "admin" && Notification.permission !== "granted") {
      setOpen(true);
    }
  }, [role]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enable Incident Notifications</AlertDialogTitle>

          <AlertDialogDescription>
            Receive instant alerts when a new incident is reported. This helps you respond quickly and stay updated in
            real time.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Not Now</AlertDialogCancel>

          <AlertDialogAction onClick={requestPermission}>Allow Notifications</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
