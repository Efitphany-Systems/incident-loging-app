import Header from "@/components/layouts/Header";
import { AppSidebar } from "@/components/layouts/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
}
