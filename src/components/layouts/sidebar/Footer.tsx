"use client";
import { Button } from "@/components/ui/button";
import { SidebarFooter, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { logout } from "../logout";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  async function handleLogout() {
    try {
      const response = await logout();
      if (!response.success) {
        throw new Error("Failed to logout");
      }
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <SidebarFooter>
      <SidebarMenuItem key={"logout"}>
        <SidebarMenuButton
          asChild
          isActive={false}
          className="bg-secondary data-[active=true]:bg-brand data-[active=true]:text-brand-foreground hover:bg-brand hover:text-brand-foreground w-full justify-start p-2 transition-colors"
        >
          <Button variant="ghost" onClick={handleLogout}>
            LOGOUT
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  );
};

export default Footer;
