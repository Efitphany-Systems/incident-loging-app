"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { RHFInput } from "@/components/form/RHFInput";
import { IncidentReportHeaders } from "@/constants/incidents";
import { WitnessEmplymentTypesOptions } from "@/constants/app";
import { RHFRadio } from "@/components/form/RHFRadio";

export default function WitnessSection() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "witnesses",
  });

  return (
    <Card className="bg-card text-card-foreground space-y-4 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.WitnessInformation}</div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 border-b pb-4">
          <div className="flex items-center justify-between font-bold">
            <span>
              {IncidentReportHeaders.Witness} {index + 1}
            </span>

            <Button variant="icon" type="button" onClick={() => remove(index)}>
              <X />
            </Button>
          </div>

          <RHFRadio
            control={control}
            name={`witnesses.${index}.employee`}
            label={IncidentReportHeaders.employmentType}
            options={WitnessEmplymentTypesOptions}
          />

          <RHFInput
            control={control}
            name={`witnesses.${index}.name`}
            label={IncidentReportHeaders.witnessName}
            placeholder="Enter witness name"
          />

          <RHFInput
            control={control}
            name={`witnesses.${index}.phone`}
            label={IncidentReportHeaders.witnessPhone}
            placeholder="Enter phone number"
          />

          <RHFInput
            control={control}
            name={`witnesses.${index}.email`}
            label={IncidentReportHeaders.witnessEmail}
            placeholder="Enter email"
          />

          <RHFInput
            control={control}
            name={`witnesses.${index}.contact_time`}
            label={IncidentReportHeaders.witnessContactTime}
            placeholder="E.g., Mornings before 10am"
          />
        </div>
      ))}

      <div className="flex flex-col items-center gap-4">
        {fields.length === 0 && <p className="text-muted-foreground">No witnesses added yet</p>}

        <Button
          type="button"
          size="xl"
          variant="primary"
          onClick={() =>
            append({
              employee: true,
              name: "",
              phone: "",
              email: "",
              contact_time: "",
            })
          }
        >
          {fields.length === 0 ? "+ Add First Witness" : "+ Add Another Witness"}
        </Button>
      </div>
    </Card>
  );
}
