import { AuthProvider } from "@/components/AuthProvider";
import Header from "@/components/layouts/Header";
import { AppSidebar } from "@/components/layouts/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { supabaseServer } from "@/lib/supabase/server-client";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    const { data } = await supabase.from("profiles").select("id, email, name, role").eq("id", user.id).single();
    profile = data;
    console.log("Profile data", profile);
  }

  return (
    <AuthProvider user={profile}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Header />
          <div className="sm:p-2 md:p-4">{children}</div>
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
