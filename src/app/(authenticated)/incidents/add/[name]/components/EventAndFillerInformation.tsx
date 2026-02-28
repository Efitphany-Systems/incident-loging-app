"use client";

import { RHFRadio } from "@/components/form/RHFRadio";
import { RHFSelect } from "@/components/form/RHFSelect";
import { Card } from "@/components/ui/card";
import { YesNoOptions } from "@/constants/app";
import { IncidentReportHeaders } from "@/constants/incidents";
import { Events } from "@/types/events";
import { useFormContext } from "react-hook-form";

export default function EventAndFillerInformation({ events }: { events: Events }) {
  const { control } = useFormContext();
  return (
    <Card className="bg-card text-card-foreground h-full space-y-1 p-4">
      <div className="text-center text-xl font-bold">{IncidentReportHeaders.EventAndFillerInformation}</div>

      <div>
        <RHFSelect
          control={control}
          name="eventAndFillerInformation.show"
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
        name="eventAndFillerInformation.wearsGlasses"
        label={IncidentReportHeaders.wearsGlasses}
        options={YesNoOptions}
      />

      <RHFRadio
        control={control}
        name="eventAndFillerInformation.inUse"
        label={IncidentReportHeaders.inUse}
        options={YesNoOptions}
      />
    </Card>
  );
}
