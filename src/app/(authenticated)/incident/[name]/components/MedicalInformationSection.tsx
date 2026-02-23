"use client";

import { RadioOption } from "@/components/form/RadioOption";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { YesNoOptions } from "@/constants/app";
import { IncidentReportHeaders } from "@/constants/incidents";
import { MedicalInformationProps } from "@/types/incident";

export default function MedicalInformationSection({ data, onChange }: MedicalInformationProps) {
  return (
    <Card className="bg-card text-card-foreground space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.MedicalInformation}</div>

      <div>
        <RadioOption
          name="visibleInjuries"
          value={data.visibleInjuries}
          onChange={(v) => onChange("visibleInjuries", v)}
          options={YesNoOptions}
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.VisibleInjuriesExplain}</Label>
        <Input
          type="text"
          value={data.visibleInjuriesExplain || ""}
          onChange={(e) => onChange("visibleInjuriesExplain", e.target.value)}
          placeholder="Describe injuries if any"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.MedicalAttention}</Label>
        <RadioGroup
          value={data.medicalAttention || ""}
          onValueChange={(e) => onChange("medicalAttention", e)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="medicalAttention-yes" />
            <Label htmlFor="medicalAttention-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="medicalAttention-no" />
            <Label htmlFor="medicalAttention-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.medicalServiceOffered}</Label>
        <RadioGroup
          value={data.offeredMedical || ""}
          onValueChange={(e) => onChange("offeredMedical", e)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="offeredMedical-yes" />
            <Label htmlFor="offeredMedical-yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="offeredMedical-no" />
            <Label htmlFor="offeredMedical-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.medicalAccepted}</Label>
        <RadioGroup value={data.accepted || ""} onValueChange={(e) => onChange("accepted", e)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="accepted-yes" />
            <Label htmlFor="accepted-yes">ACCEPTED</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="accepted-no" />
            <Label htmlFor="accepted-no">REFUSED</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.ambulanceRequested}</Label>
        <RadioGroup
          value={data.ambulanceRequested || ""}
          onValueChange={(e) => onChange("ambulanceRequested", e)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="ambulanceRequested-yes" />
            <Label htmlFor="ambulanceRequested-yes">YES</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="ambulanceRequested-no" />
            <Label htmlFor="ambulanceRequested-no">NO</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.ambulanceCompany}</Label>
        <Input
          type="text"
          value={data.ambulanceCompany || ""}
          onChange={(e) => onChange("ambulanceCompany", e.target.value)}
          placeholder="Ambulance company name"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.ambulanceEMT}</Label>
        <Input
          type="text"
          value={data.ambulanceEMT || ""}
          onChange={(e) => onChange("ambulanceEMT", e.target.value)}
          placeholder="EMT info"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.didPatientLeaveAmbulance}</Label>

        <RadioGroup
          value={data.didPatientLeaveAmbulance || ""}
          onValueChange={(e) => onChange("didPatientLeaveAmbulance", e)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="didPatientLeaveAmbulance-yes" />
            <Label htmlFor="didPatientLeaveAmbulance-yes">YES</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="didPatientLeaveAmbulance-no" />
            <Label htmlFor="didPatientLeaveAmbulance-no">NO</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-bold">{IncidentReportHeaders.whereTheyGo}</Label>
        <Input
          type="text"
          value={data.whereTheyGo || ""}
          onChange={(e) => onChange("whereTheyGo", e.target.value)}
          placeholder="Where did they go?"
        />
      </div>
    </Card>
  );
}
