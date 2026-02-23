"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const IncidentPageHeader = ({ name }: { name: string }) => {
  const router = useRouter();
  return (
    <div className="mb-4 flex items-center justify-start">
      <ChevronLeft
        className="h-10 w-10 cursor-pointer"
        onClick={() => {
          router.push("/incident");
        }}
      />
      <div className="text-accent-foreground inline-block text-xl font-bold md:text-3xl">{name}</div>
    </div>
  );
};

export default IncidentPageHeader;
