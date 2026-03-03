import PageHeader from "@/components/layouts/PageHeader";
import CreateStaffForm from "./CreateStaffForm";

const page = () => {
  return (
    <div className="mx-auto">
      <PageHeader name="Create New Staff" />
      <CreateStaffForm />
    </div>
  );
};

export default page;
