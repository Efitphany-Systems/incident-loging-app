"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { menuItems } from "@/constants/home";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        children={
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Incident Logging App</span>
          </div>
        }
      />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="bg-secondary data-[active=true]:bg-brand data-[active=true]:text-brand-foreground hover:bg-brand hover:text-brand-foreground w-full justify-start p-2 transition-colors"
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        children={
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">© 2024 Incident Logging App</span>
          </div>
        }
      />
    </Sidebar>
  );
}
