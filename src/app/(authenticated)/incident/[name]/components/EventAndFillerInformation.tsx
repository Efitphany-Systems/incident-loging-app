"use client";

import { RHFRadio } from "@/components/form/RHFRadio";
import { RHFSelect } from "@/components/form/RHFSelect";
import { Card } from "@/components/ui/card";
import { YesNoOptions } from "@/constants/app";
import { IncidentReportHeaders, shows } from "@/constants/incidents";
import { useFormContext } from "react-hook-form";

export default function EventAndFillerInformation() {
  const { control } = useFormContext();
  return (
    <Card className="bg-card text-card-foreground h-full space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.EventAndFillerInformation}</div>

      <div>
        <RHFSelect
          control={control}
          name="eventAndFillerInformation.show"
          label={IncidentReportHeaders.show}
          placeholder="Select show"
          options={shows.map((s) => ({ label: s, value: s }))}
        />
      </div>

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.wearsGlasses"
        label={IncidentReportHeaders.wearsGlasses}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.inUse"
        label={IncidentReportHeaders.inUse}
        options={YesNoOptions}
      />
    </Card>
  );
}
