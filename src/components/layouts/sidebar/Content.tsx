"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { menu } from "@/utils/menu.selector";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Content = ({ role }: { role: string }) => {
  const pathname = usePathname();

  const menuItems = role ? menu(role) : [];
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className="bg-secondary data-[active=true]:bg-brand data-[active=true]:text-brand-foreground hover:bg-brand hover:text-brand-foreground w-full justify-start p-2 transition-colors"
                  >
                    <Link href={item.href} onClick={() => setOpenMobile(false)}>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
