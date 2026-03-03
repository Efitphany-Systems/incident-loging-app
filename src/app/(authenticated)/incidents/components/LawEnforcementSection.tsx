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
        name="law.law_enforcement_contacted"
        label={IncidentReportHeaders.contacted}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="law.contact_explanation"
        label={IncidentReportHeaders.explanation}
        placeholder="Provide explanation"
      />

      <RHFRadio
        control={control}
        name="law.police_report_written"
        label={IncidentReportHeaders.reportWritten}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="law.police_report_number"
        label={IncidentReportHeaders.reportNumber}
        placeholder="Police report number"
      />

      <RHFInput
        control={control}
        name="law.citation_or_charge_or_arrest"
        label={IncidentReportHeaders.citation}
        placeholder="Citation or charge info"
      />

      <RHFInput
        control={control}
        name="law.officer_name_badge"
        label={IncidentReportHeaders.officerName}
        placeholder="Enter officer name and badge number"
      />
    </Card>
  );
}
