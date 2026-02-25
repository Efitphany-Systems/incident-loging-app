import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <div className="bg-card flex justify-between p-3">
      <SidebarTrigger size={"xl"} />
    </div>
  );
};

export default Header;
