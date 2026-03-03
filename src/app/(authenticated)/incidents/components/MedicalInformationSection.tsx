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
        name="medical.visible_injuries"
        label={IncidentReportHeaders.VisibleInjuries}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.injury_explanation"
        label={IncidentReportHeaders.VisibleInjuriesExplain}
        placeholder="Describe injuries if any"
      />

      <RHFRadio
        control={control}
        name="medical.medical_attention_apparent"
        label={IncidentReportHeaders.MedicalAttention}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="medical.medical_services_offered"
        label={IncidentReportHeaders.medicalServiceOffered}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="medical.medical_services_accepted"
        label={IncidentReportHeaders.medicalAccepted}
        options={[
          { label: "ACCEPTED", value: true },
          { label: "REFUSED", value: false },
        ]}
      />

      <RHFRadio
        control={control}
        name="medical.ambulance_requested"
        label={IncidentReportHeaders.ambulanceRequested}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.ambulance_company"
        label={IncidentReportHeaders.ambulanceCompany}
        placeholder="Ambulance company name"
      />

      <RHFInput
        control={control}
        name="medical.emt_name_or_number"
        label={IncidentReportHeaders.ambulanceEMT}
        placeholder="EMT info"
      />

      <RHFRadio
        control={control}
        name="medical.patron_left_in_ambulance"
        label={IncidentReportHeaders.didPatientLeaveAmbulance}
        options={YesNoOptions}
      />

      <RHFInput
        control={control}
        name="medical.destination"
        label={IncidentReportHeaders.whereTheyGo}
        placeholder="Where did they go?"
      />
    </Card>
  );
}
