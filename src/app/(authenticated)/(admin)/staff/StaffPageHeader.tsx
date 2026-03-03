"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const StaffPageHeader = () => {
  const router = useRouter();
  const handleAddStaff = () => {
    router.push("/staff/add");
  };
  return (
    <PageHeader
      name="Staff"
      postAction={
        <Button variant="primary" size="lg" onClick={handleAddStaff}>
          <Plus />
          Add New Staff
        </Button>
      }
    />
  );
};

export default StaffPageHeader;
