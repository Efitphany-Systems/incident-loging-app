"use client";

import PageHeader from "@/components/layouts/PageHeader";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const IncidentPageHeader = ({ name }: { name: string }) => {
  const router = useRouter();
  return (
    <PageHeader
      name={name}
      preAction={
        <ChevronLeft
          className="-ml-2 h-10 w-10 cursor-pointer"
          onClick={() => {
            router.push("/incident");
          }}
        />
      }
    />
  );
};

export default IncidentPageHeader;
