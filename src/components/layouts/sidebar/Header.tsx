import { SidebarHeader } from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants/app";

const Header = () => {
  return (
    <SidebarHeader
      children={
        <div className="flex justify-between p-3">
          <span className="text-lg font-bold">{APP_NAME}</span>
        </div>
      }
    />
  );
};

export default Header;
