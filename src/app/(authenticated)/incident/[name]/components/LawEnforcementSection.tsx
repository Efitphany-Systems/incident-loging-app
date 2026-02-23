"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IncidentReportHeaders } from "@/constants/incidents";
import { LawEnforcementProps } from "@/types/incident";

export default function LawEnforcementSection({ data, onChange }: LawEnforcementProps) {
  return (
    <Card className="bg-card text-card-foreground h-full space-y-1 p-4">
      <div className="text-card-foreground w-full p-3 text-center font-bold">
        {IncidentReportHeaders.LawEnforcement}
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.contacted}</Label>
        <RadioGroup value={data.contacted || ""} onValueChange={(e) => onChange("contacted", e)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="contacted-yes" />
            <Label htmlFor="contacted-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="contacted-no" />
            <Label htmlFor="contacted-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.explanation}</Label>
        <Input
          type="text"
          value={data.explanation || ""}
          onChange={(e) => onChange("explanation", e.target.value)}
          placeholder="Provide explanation"
          className="focus:ring-accent border-2 border-black focus:ring-2 focus:outline-none"
        />
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.reportWritten}</Label>
        <RadioGroup
          value={data.reportWritten || ""}
          onValueChange={(e) => onChange("reportWritten", e)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="report-written-yes" />
            <Label htmlFor="report-written-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="report-written-no" />
            <Label htmlFor="report-written-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.reportNumber}</Label>
        <Input
          type="text"
          value={data.reportNumber || ""}
          onChange={(e) => onChange("reportNumber", e.target.value)}
          placeholder="Police report number"
          className="focus:ring-accent border-2 border-black focus:ring-2 focus:outline-none"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.citation}</Label>
        <Input
          type="text"
          value={data.citation || ""}
          onChange={(e) => onChange("citation", e.target.value)}
          placeholder="Citation or charge info"
          className="focus:ring-accent border-2 border-black focus:ring-2 focus:outline-none"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.officerName}</Label>
        <Input
          type="text"
          value={data.officerName || ""}
          onChange={(e) => onChange("officerName", e.target.value)}
          placeholder="Enter officer name and badge number"
          className="focus:ring-accent border-2 border-black focus:ring-2 focus:outline-none"
        />
      </div>
    </Card>
  );
}
