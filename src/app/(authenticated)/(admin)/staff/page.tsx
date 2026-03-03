import { getStaffAction } from "./action";
import StaffPageHeader from "./StaffPageHeader";
import StaffTable from "./StaffTable";

export default async function StaffPage() {
  const staff = await getStaffAction();
  return (
    <div className="mx-auto">
      <StaffPageHeader />
      <StaffTable staff={staff} />
    </div>
  );
}
