"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const IncidentsPageHeader = ({ params, enabled }: { params: string; enabled: boolean }) => {
  const router = useRouter();
  const exportUrl = `/incidents/export?${params}`;
  const handleAddIncident = () => {
    router.push("/incidents/add");
  };
  return (
    <PageHeader
      name="Incidents"
      postAction={
        <div className="flex items-baseline gap-2 align-baseline">
          <Button variant="primary" size="lg" onClick={handleAddIncident}>
            <Plus />
            <span className="hidden md:block">Add New Incident</span>
          </Button>
          <Link href={exportUrl} className="flex">
            <Button disabled={!enabled} size="lg" variant="primary" className="max-h-10">
              <Download />
              <span className="hidden md:block">Export CSV</span>
            </Button>
          </Link>
        </div>
      }
    />
  );
};

export default IncidentsPageHeader;
