import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <div className="flex justify-between p-3">
      <SidebarTrigger size={"xl"} />
    </div>
  );
};

export default Header;
