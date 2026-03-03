"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const IncidentsPageHeader = () => {
  const router = useRouter();
  const handleAddIncident = () => {
    router.push("/incidents/add");
  };
  return (
    <PageHeader
      name="Incidents"
      postAction={
        <Button variant="primary" size="lg" onClick={handleAddIncident}>
          <Plus />
          Add New Incident
        </Button>
      }
    />
  );
};

export default IncidentsPageHeader;
