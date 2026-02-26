import StaffTable from "./components/StaffTable";
import StaffPageHeader from "./components/StaffPageHeader";
import { getStaffAction } from "./action";

export default async function StaffPage() {
  const staff = await getStaffAction();
  return (
    <div className="mx-auto">
      <StaffPageHeader />
      <StaffTable staff={staff} />
    </div>
  );
}
