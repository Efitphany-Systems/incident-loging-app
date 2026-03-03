"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const VenuesPageHeader = () => {
  const router = useRouter();
  const handleAddIncident = () => {
    router.push("/venues/add");
  };
  return (
    <PageHeader
      name="Venues"
      postAction={
        <Button
          variant="primary"
          disabled
          className="disabled:pointer-events-auto disabled:cursor-not-allowed"
          size="lg"
          onClick={handleAddIncident}
        >
          <Plus />
          Add New Venue
        </Button>
      }
    />
  );
};

export default VenuesPageHeader;
