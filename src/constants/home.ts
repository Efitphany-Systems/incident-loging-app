import { MenuItem } from "@/types/home";

export const menuItems: MenuItem[] = [
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
  {
    id: "login",
    title: "LOGIN",
    href: "/login",
  },
];

export const eventInfo = {
  stage: "Main Stage",
  artist: "Tyler Williams",
  time: "8:45 PM",
};
