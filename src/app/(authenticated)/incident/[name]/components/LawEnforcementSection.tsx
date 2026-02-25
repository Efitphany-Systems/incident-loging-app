"use client";

import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { RHFInput } from "@/components/form/RHFInput";
import { RHFRadio } from "@/components/form/RHFRadio";
import { IncidentReportHeaders } from "@/constants/incidents";
import { YesNoOptions } from "@/constants/app";

export default function LawEnforcementSection() {
  const { control } = useFormContext();

  return (
    <Card className="bg-card text-card-foreground h-full space-y-4 p-4">
      <div className="text-center font-bold">{IncidentReportHeaders.LawEnforcement}</div>

      <RHFRadio
        control={control}
        name="lawEnforcement.contacted"
        label={IncidentReportHeaders.contacted}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="lawEnforcement.explanation"
        label={IncidentReportHeaders.explanation}
        placeholder="Provide explanation"
      />

      <RHFRadio
        control={control}
        name="lawEnforcement.reportWritten"
        label={IncidentReportHeaders.reportWritten}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="lawEnforcement.reportNumber"
        label={IncidentReportHeaders.reportNumber}
        placeholder="Police report number"
      />

      <RHFInput
        control={control}
        name="lawEnforcement.citation"
        label={IncidentReportHeaders.citation}
        placeholder="Citation or charge info"
      />

      <RHFInput
        control={control}
        name="lawEnforcement.officerName"
        label={IncidentReportHeaders.officerName}
        placeholder="Enter officer name and badge number"
      />
    </Card>
  );
}
