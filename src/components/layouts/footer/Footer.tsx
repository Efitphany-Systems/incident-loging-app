"use client";

import { SidebarFooter, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Loader } from "lucide-react";

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
import { signOut } from "./action";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <SidebarFooter>
      <SidebarMenuItem>
        <AlertDialog>
          {/* Trigger */}
          <AlertDialogTrigger asChild>
            <SidebarMenuButton
              isActive={false}
              className="bg-secondary hover:bg-brand hover:text-brand-foreground w-full cursor-pointer justify-start p-2 transition-colors"
            >
              <div className="w-full text-center">LOGOUT</div>
            </SidebarMenuButton>
          </AlertDialogTrigger>

          {/* Dialog */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to log out of your account?</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSigningOut}>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isSigningOut ? <Loader aria-hidden className="animate-spin" /> : "Logout"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarFooter>
  );
};

export default Footer;
