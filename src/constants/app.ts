import { UserRole } from "@/lib/roles";
import { MenuItem } from "@/types/home";

export const APP_NAME = "Efitphany Systems";
export const APP_DESCRIPTION = "Efitphany Systems incident logging app";
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/",
    roles: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    id: "events",
    title: "EVENTS",
    href: "/events",
    roles: [UserRole.ADMIN],
  },
  {
    id: "incidents",
    title: "INCIDENTS",
    href: "/incidents",
    roles: [UserRole.ADMIN, UserRole.STAFF],
  },
  // {
  //   id: "assigned-zones",
  //   title: "MY ASSIGNED ZONES",
  //   href: "/assigned-zones",
  // },
  // {
  //   id: "radio-alerts",
  //   title: "RADIO ALERTS",
  //   href: "/alerts",
  // },
  {
    id: "staff-management",
    title: "STAFF MANAGEMENT",
    href: "/staff",
    roles: [UserRole.ADMIN],
  },
  {
    id: "venues",
    title: "ALL VENUES",
    href: "/venues",
    roles: [UserRole.ADMIN],
  },
];

export const eventInfo = {
  stage: "Main Stage",
  artist: "Tyler Williams",
  time: "8:45 PM",
};

export const YesNoOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const SeverityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const WitnessEmplymentTypesOptions = [
  { label: "Employee", value: true },
  { label: "Non Employee", value: false },
];
