"use client";

import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { RHFRadio } from "@/components/form/RHFRadio";
import { RHFInput } from "@/components/form/RHFInput";
import { YesNoOptions } from "@/constants/app";
import { IncidentReportHeaders } from "@/constants/incidents";

export default function MedicalInformationSection() {
  const { control } = useFormContext();

  return (
    <Card className="bg-card text-card-foreground space-y-4 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.MedicalInformation}</div>

      <RHFRadio
        control={control}
        name="medical.visibleInjuries"
        label={IncidentReportHeaders.VisibleInjuries}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.visibleInjuriesExplain"
        label={IncidentReportHeaders.VisibleInjuriesExplain}
        placeholder="Describe injuries if any"
      />

      <RHFRadio
        control={control}
        name="medical.medicalAttention"
        label={IncidentReportHeaders.MedicalAttention}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="medical.offeredMedical"
        label={IncidentReportHeaders.medicalServiceOffered}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="medical.accepted"
        label={IncidentReportHeaders.medicalAccepted}
        options={[
          { label: "ACCEPTED", value: "yes" },
          { label: "REFUSED", value: "no" },
        ]}
      />

      <RHFRadio
        control={control}
        name="medical.ambulanceRequested"
        label={IncidentReportHeaders.ambulanceRequested}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.ambulanceCompany"
        label={IncidentReportHeaders.ambulanceCompany}
        placeholder="Ambulance company name"
      />

      <RHFInput
        control={control}
        name="medical.ambulanceEMT"
        label={IncidentReportHeaders.ambulanceEMT}
        placeholder="EMT info"
      />

      <RHFRadio
        control={control}
        name="medical.didPatientLeaveAmbulance"
        label={IncidentReportHeaders.didPatientLeaveAmbulance}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.whereTheyGo"
        label={IncidentReportHeaders.whereTheyGo}
        placeholder="Where did they go?"
      />
    </Card>
  );
}
