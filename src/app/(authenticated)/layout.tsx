import Header from "@/components/layouts/Header";
import { AppSidebar } from "@/components/layouts/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="sm:p-2 md:p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
