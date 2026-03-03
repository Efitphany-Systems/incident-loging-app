import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentProfile();

  if (!user) {
    redirect("/login");
  }
  if (user.role !== "admin") {
    redirect("/incidents");
  }
  return <>{children}</>;
}
