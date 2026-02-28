"use client";

import { Button } from "@/components/ui/button";
import PatronInformationSection from "./PatronInformationSection";
import WitnessSection from "./WitnessSection";
import MedicalInformationSection from "./MedicalInformationSection";
import LawEnforcementSection from "./LawEnforcementSection";
import { Ambulance, Loader, Scale } from "lucide-react";
import EventAndFillerInformation from "./EventAndFillerInformation";
import { useIncidentForm } from "@/hooks/use-create-incident";
import { FormProvider } from "react-hook-form";
import { defaultLaw, defaultMedical } from "@/constants/incidents";
import { Events } from "@/types/events";

export default function IncidentReportForm({ category, events }: { category: string; events: Events }) {
  const form = useIncidentForm(category);
  const medicalSection = form.watch("medical");
  const lawSection = form.watch("lawEnforcement");
  const enableMedical = () => form.setValue("medical", defaultMedical);
  const disableMedical = () => form.setValue("medical", undefined);
  const enableLaw = () => form.setValue("lawEnforcement", defaultLaw);
  const disableLaw = () => form.setValue("lawEnforcement", undefined);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.reportIncident} className="space-y-4">
        <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row">
          <div className="w-full lg:flex-1">
            <EventAndFillerInformation events={events} />
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
