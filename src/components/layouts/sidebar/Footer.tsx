"use client";

import { Button } from "@/components/ui/button";
import { SidebarFooter, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";

const Footer = () => {
  const { signOut, isSigningOut } = useAuth();

  return (
    <SidebarFooter>
      <SidebarMenuItem key="logout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <SidebarMenuButton
            asChild
            isActive={false}
            className="bg-secondary data-[active=true]:bg-brand data-[active=true]:text-brand-foreground hover:bg-brand hover:text-brand-foreground w-full justify-start p-2 transition-colors"
          >
            <Button type="submit" variant="ghost" disabled={isSigningOut} className="w-full justify-center">
              {isSigningOut ? <Loader className="animate-spin" /> : "LOGOUT"}
            </Button>
          </SidebarMenuButton>
        </form>
      </SidebarMenuItem>
    </SidebarFooter>
  );
};

export default Footer;
