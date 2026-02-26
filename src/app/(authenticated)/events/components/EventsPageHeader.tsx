"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const EventsPageHeader = () => {
  const router = useRouter();
  const handleAddIncident = () => {
    router.push("/events/add");
  };
  return (
    <PageHeader
      name="Events"
      postAction={
        <Button variant="primary" size="lg" onClick={handleAddIncident}>
          <Plus />
          Add New Event
        </Button>
      }
    />
  );
};

export default EventsPageHeader;
