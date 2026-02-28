import { MenuItem } from "@/types/home";

export const APP_NAME = "Efitphany Systems";
export const APP_DESCRIPTION = "Efitphany Systems incident logging app";
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/",
  },
  {
    id: "events",
    title: "EVENTS",
    href: "/events",
  },
  {
    id: "incidents",
    title: "INCIDENTS",
    href: "/incidents",
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
  },
  {
    id: "venues",
    title: "ALL VENUES",
    href: "/venues",
  },
];

export const eventInfo = {
  stage: "Main Stage",
  artist: "Tyler Williams",
  time: "8:45 PM",
};

export const YesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const SeverityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
