"use client";

import { Button } from "@/components/ui/button";
import { Ambulance, Loader, Scale } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { defaultLaw, defaultMedical } from "@/constants/incidents";
import { Events } from "@/types/events";
import { Locations } from "@/types/locations";
import EventAndFillerInformation from "../../components/EventAndFillerInformation";
import PatronInformationSection from "../../components/PatronInformationSection";
import MedicalInformationSection from "../../components/MedicalInformationSection";
import LawEnforcementSection from "../../components/LawEnforcementSection";
import WitnessSection from "../../components/WitnessSection";
import { IncidentReport } from "@/types/incidents";
import { useEditIncidentForm } from "@/hooks/use-edit-incident";

export default function EditIncidentReportForm({
  events,
  locations,
  incident,
}: {
  events: Events;
  locations: Locations;
  incident: IncidentReport;
}) {
  const form = useEditIncidentForm(incident);
  const medicalSection = form.watch("medical");
  const lawSection = form.watch("law");
  const enableMedical = () => form.setValue("medical", defaultMedical);
  const disableMedical = () => form.setValue("medical", null);
  const enableLaw = () => form.setValue("law", defaultLaw);
  const disableLaw = () => form.setValue("law", null);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.reportIncident} className="space-y-4">
        <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row">
          <div className="w-full lg:flex-1">
            <EventAndFillerInformation events={events} locations={locations} />
          </div>
          <div className="w-full lg:flex-1">
            <PatronInformationSection />
          </div>
        </div>

        <WitnessSection />

        <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row">
          {!!medicalSection && (
            <div className="w-full lg:flex-1">
              <div className="space-y-4">
                <MedicalInformationSection />
                <Button type="button" onClick={disableMedical} variant="link" className="w-full">
                  Remove Medical Information
                </Button>
              </div>
            </div>
          )}

          {!!lawSection && (
            <div className="w-full lg:flex-1">
              <div className="space-y-4">
                <LawEnforcementSection />
                <Button type="button" onClick={disableLaw} variant="link" className="w-full">
                  Remove Law Enforcement Information
                </Button>
              </div>
            </div>
          )}
        </div>

        {form.formState.errors.root && (
          <p role="alert" className="text-destructive text-center text-sm">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="flex w-full flex-col items-center justify-end gap-4 px-4 lg:flex-row">
          {!medicalSection && (
            <Button type="button" size="xl" className="w-full lg:w-72" onClick={enableMedical} variant="default">
              <Ambulance />
              Add Medical Information
            </Button>
          )}
          {!lawSection && (
            <Button type="button" size="xl" className="w-full lg:w-72" onClick={enableLaw} variant="default">
              <Scale />
              Add Law Enforcement Information
            </Button>
          )}
          <Button
            size="xl"
            type="submit"
            variant="primary"
            disabled={form.formState.isSubmitting}
            className="w-full lg:w-64"
          >
            {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "SUBMIT INCIDENT REPORT"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
