"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncidentReportHeaders, shows } from "@/constants/incidents";
import { FormSectionProps } from "@/types/incident";

export default function MandatoryInformation({ formData, onChange }: FormSectionProps) {
  return (
    <Card className="bg-card text-card-foreground h-full space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.MandatoryInformation}</div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.show}</Label>

        <Select value={formData.show} onValueChange={(value) => onChange("show", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a show" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {shows.map((show) => (
                <SelectItem key={show} value={show}>
                  {show}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.wearsGlasses}</Label>
        <RadioGroup
          value={formData.wearsGlasses}
          onValueChange={(v) => onChange("wearsGlasses", v)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="wearsGlasses-yes" />
            <Label htmlFor="wearsGlasses-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="wearsGlasses-no" />
            <Label htmlFor="wearsGlasses-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.inUse}</Label>
        <RadioGroup value={formData.inUse} onValueChange={(v) => onChange("inUse", v)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="inUse-yes" />
            <Label htmlFor="inUse-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="inUse-no" />
            <Label htmlFor="inUse-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
}
