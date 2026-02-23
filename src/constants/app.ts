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
    id: "new-incident",
    title: "NEW INCIDENT",
    href: "/incident",
  },
  {
    id: "todays-incidents",
    title: "VIEW TODAY'S INCIDENTS",
    href: "/incident-list",
  },
  {
    id: "assigned-zones",
    title: "MY ASSIGNED ZONES",
    href: "/assigned-zones",
  },
  {
    id: "radio-alerts",
    title: "RADIO ALERTS",
    href: "/alerts",
  },
  {
    id: "add-security-staff",
    title: "ADD NEW STAFF",
    href: "/add-staff",
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
