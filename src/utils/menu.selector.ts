import { menuItems } from "@/constants/app";

export function menu(role: string) {
  return menuItems.filter((menu) => menu.roles.includes(role));
}
