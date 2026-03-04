"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncidentCategories, IncidentCategory } from "@/types/categories";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function IncidentsFilters({ categories }: { categories: IncidentCategories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  console.log(isPending);

  const currentDate = searchParams.get("date") ?? "";
  const currentCategory = searchParams.get("category") ?? "all";
  const currentSeverity = searchParams.get("severity") ?? "all";

  const severityOptions = [
    { label: "All Severity", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {/* Date */}
      <Input
        type="date"
        className="md:w-50"
        value={currentDate}
        onChange={(e) => updateFilter("date", e.target.value)}
      />

      {/* Category */}
      <Select value={currentCategory} onValueChange={(value) => updateFilter("category", value)}>
        <SelectTrigger className="w-[40vw] md:w-50">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((category: IncidentCategory) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Severity */}
      <Select value={currentSeverity} onValueChange={(value) => updateFilter("severity", value)}>
        <SelectTrigger className="w-[40vw] md:w-50">
          <SelectValue placeholder="Select severity" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {severityOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
