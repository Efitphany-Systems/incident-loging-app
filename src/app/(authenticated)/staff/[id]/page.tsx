import PageHeader from "@/components/layouts/PageHeader";
import EditStaffForm from "./EditStaffForm";
import { getStaffByID } from "./actions";

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const extractedParams = await params;
  const staff = await getStaffByID(extractedParams.id);
  return (
    <div className="mx-auto">
      <PageHeader name="Edit Staff" />
      <EditStaffForm staff={staff} />
    </div>
  );
}
