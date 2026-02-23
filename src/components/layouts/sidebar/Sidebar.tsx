import { Sidebar } from "@/components/ui/sidebar";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export function AppSidebar() {
  return (
    <Sidebar>
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
}
