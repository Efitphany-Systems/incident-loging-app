"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { RHFInput } from "@/components/form/RHFInput";
import { IncidentReportHeaders } from "@/constants/incidents";
import { Witness } from "@/types/incidents";

export default function WitnessSection() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "witnesses",
  });

  const witnesses =
    useWatch({
      control,
      name: "witnesses",
    }) || [];

  const employeeCount = witnesses.filter((f: Witness) => f.employee === true).length;
  const nonEmployeeCount = witnesses.filter((f: Witness) => f.employee === false).length;

  const addWitness = (isEmployee: boolean) => {
    append({
      employee: isEmployee,
      name: "",
      phone: "",
      email: "",
      contact_time: "",
    });
  };

  return (
    <Card className="bg-card text-card-foreground space-y-4 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.WitnessInformation}</div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 border-b pb-4">
          <div className="flex items-center justify-between font-bold">
            <span>
              {IncidentReportHeaders.Witness} {witnesses[index]?.employee ? "Employee" : "Non Employee"}
            </span>

            <Button variant="icon" type="button" onClick={() => remove(index)}>
              <X />
            </Button>
          </div>

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
        <div className="flex flex-wrap gap-3">
          {employeeCount < 3 && (
            <Button type="button" size="sm" variant="default" onClick={() => addWitness(true)}>
              + Add Employee Witness
            </Button>
          )}

          {nonEmployeeCount < 2 && (
            <Button type="button" size="sm" variant="default" onClick={() => addWitness(false)}>
              + Add Non Employee Witness
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
