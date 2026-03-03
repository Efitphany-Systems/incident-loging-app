"use client";

import { RHFInput } from "@/components/form/RHFInput";
import { Card } from "@/components/ui/card";
import { IncidentReportHeaders } from "@/constants/incidents";
import { useFormContext } from "react-hook-form";

export default function PatronInformationSection() {
  const { control } = useFormContext();
  return (
    <Card className="bg-card text-card-foreground space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.PatronInformation}</div>
      <RHFInput
        control={control}
        name="patron.name"
        label={IncidentReportHeaders.patronName}
        placeholder="Enter patron name"
      />

      <RHFInput
        control={control}
        name="patron.phone"
        label={IncidentReportHeaders.patronPhone}
        placeholder="Enter phone number"
      />
      <RHFInput
        control={control}
        name="patron.email"
        label={IncidentReportHeaders.patronEmail}
        placeholder="Enter email address"
      />
      <RHFInput
        control={control}
        name="patron.contact_time"
        label={IncidentReportHeaders.patronContactTime}
        placeholder="E.g., Evenings after 5pm"
      />
      <RHFInput
        control={control}
        name="patron.address_street"
        label={IncidentReportHeaders.patronAddress}
        placeholder="Enter street address"
      />
      <RHFInput
        control={control}
        name="patron.address_city"
        label={IncidentReportHeaders.patronCityState}
        placeholder="Enter city, state, and zip code"
      />
    </Card>
  );
}
