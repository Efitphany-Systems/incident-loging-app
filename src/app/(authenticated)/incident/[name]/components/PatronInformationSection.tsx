"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IncidentReportHeaders } from "@/constants/incidents";
import { PatronInformationSectionProps } from "@/types/incident";

export default function PatronInformationSection({ data, onChange }: PatronInformationSectionProps) {
  return (
    <Card className="bg-card text-card-foreground space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.PatronInformation}</div>
      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.patronName}</Label>
        <Input
          type="text"
          value={data.patronName}
          onChange={(e) => onChange("patronName", e.target.value)}
          placeholder="Enter full name"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.patronPhone}</Label>
        <Input
          type="tel"
          value={data.patronPhone}
          onChange={(e) => onChange("patronPhone", e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <Label className="mb-1 text-sm font-bold">{IncidentReportHeaders.patronEmail}</Label>
        <Input
          type="email"
          value={data.patronEmail}
          onChange={(e) => onChange("patronEmail", e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.patronContactTime}</Label>
        <Input
          type="text"
          value={data.patronContactTime}
          onChange={(e) => onChange("patronContactTime", e.target.value)}
          placeholder="E.g., Evenings after 5pm"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.patronAddress}</Label>
        <Input
          type="text"
          value={data.patronAddress}
          onChange={(e) => onChange("patronAddress", e.target.value)}
          placeholder="Enter street address"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.patronCityState}</Label>
        <Input
          type="text"
          value={data.patronCityState}
          onChange={(e) => onChange("patronCityState", e.target.value)}
          placeholder="Enter city, state, and zip"
        />
      </div>
    </Card>
  );
}
