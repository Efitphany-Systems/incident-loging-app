"use client";

import { RHFInput } from "@/components/form/RHFInput";
import { RHFRadio } from "@/components/form/RHFRadio";
import { RHFSelect } from "@/components/form/RHFSelect";
import { Card } from "@/components/ui/card";
import { SeverityOptions, YesNoOptions } from "@/constants/app";
import { IncidentReportHeaders } from "@/constants/incidents";
import { Events } from "@/types/events";
import { Locations } from "@/types/locations";
import { useFormContext } from "react-hook-form";

export default function EventAndFillerInformation({ events, locations }: { events: Events; locations: Locations }) {
  const { control } = useFormContext();
  return (
    <Card className="bg-card text-card-foreground h-full space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.EventAndFillerInformation}</div>

      <div>
        <RHFSelect
          control={control}
          name="eventAndFillerInformation.event_id"
          label={IncidentReportHeaders.show}
          placeholder="Select show"
          options={events.map((event) => ({
            label: `${event.name} on ${event.event_date} from ${event.start_time} to ${event.end_time}`,
            value: event.id,
          }))}
        />
      </div>

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.wears_glasses"
        label={IncidentReportHeaders.wearsGlasses}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.in_use"
        label={IncidentReportHeaders.inUse}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.severity"
        label={IncidentReportHeaders.severity}
        options={SeverityOptions}
      />

      <div>
        <RHFSelect
          control={control}
          name="eventAndFillerInformation.location_id"
          label={IncidentReportHeaders.location}
          placeholder="Select location"
          options={locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
        />
      </div>

      <RHFInput
        name="eventAndFillerInformation.description"
        control={control}
        label="Description"
        placeholder="Description for incident"
      />
    </Card>
  );
}
