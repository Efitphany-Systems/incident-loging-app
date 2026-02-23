"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WitnessSectionProps } from "@/types/incident";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncidentReportHeaders, witnessTypes } from "@/constants/incidents";

export default function WitnessSection({
  witnesses,
  onAddWitness,
  onRemoveWitness,
  onUpdateWitness,
}: WitnessSectionProps) {
  return (
    <Card className="bg-card text-card-foreground space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.WitnessInformation}</div>

      {witnesses.map((witness, index) => (
        <div key={witness.id}>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-2 font-bold">
              <span>
                {IncidentReportHeaders.Witness} {index + 1}
              </span>
              {witnesses.length > 1 && (
                <Button variant="icon" type="button" onClick={() => onRemoveWitness(witness.id)}>
                  <X />
                </Button>
              )}
            </div>

            <div>
              <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.employmentType}</Label>
              <Select
                value={witness.employmentType}
                onValueChange={(value) => onUpdateWitness(witness.id, "employmentType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {witnessTypes.map((type: string) => (
                      <SelectItem key={type} value={type}>
                        {type.toLocaleUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.witnessName}</Label>
              <Input
                type="text"
                value={witness.name}
                onChange={(e) => onUpdateWitness(witness.id, "name", e.target.value)}
                placeholder="Enter witness name"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.witnessPhone}</Label>
              <Input
                type="tel"
                value={witness.phone}
                onChange={(e) => onUpdateWitness(witness.id, "phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.witnessEmail}</Label>
              <Input
                type="email"
                value={witness.email}
                onChange={(e) => onUpdateWitness(witness.id, "email", e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.witnessContactTime}</Label>
              <Input
                type="text"
                value={witness.contactTime}
                onChange={(e) => onUpdateWitness(witness.id, "contactTime", e.target.value)}
                placeholder="E.g., Mornings before 10am"
              />
            </div>
          </div>
          <hr />
        </div>
      ))}

      <div className="flex flex-col items-center gap-4">
        {witnesses.length === 0 && <p className="text-muted-foreground">No witnesses added yet</p>}
        <Button type="button" size="xl" variant={"primary"} onClick={onAddWitness}>
          {witnesses.length === 0 ? "+ Add First Witness" : "+ Add Another Witness"}
        </Button>
      </div>
    </Card>
  );
}
