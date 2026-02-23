"use client";

import { Button } from "@/components/ui/button";
import PatronInformationSection from "./PatronInformationSection";
import WitnessSection from "./WitnessSection";
import MedicalInformationSection from "./MedicalInformationSection";
import LawEnforcementSection from "./LawEnforcementSection";
import { Ambulance, Loader, Scale } from "lucide-react";
import EventAndFillerInformation from "./EventAndFillerInformation";
import { useIncidentForm } from "@/hooks/useIncidentForm";

export default function IncidentReportForm({ category }: { category: string }) {
  const {
    formData,
    updateSection,
    addWitness,
    removeWitness,
    updateWitness,
    showMedical,
    enableMedical,
    disableMedical,
    enableLawEnforcement,
    disableLawEnforcement,
    showLawEnforcement,
    isSubmitting,
    handleSubmit,
  } = useIncidentForm(category);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* EventAndFillerInformation */}
      <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
        <div className="w-full md:flex-1">
          <EventAndFillerInformation
            formData={formData.eventAndFillerInformation}
            onChange={updateSection("eventAndFillerInformation")}
          />
        </div>
        <div className="w-full md:flex-1">
          <PatronInformationSection formData={formData} onChange={updateSection("patronInformation")} />
        </div>
      </div>

      {/* WitnessSection */}
      <div>
        <WitnessSection
          witnesses={formData.witnesses}
          onAddWitness={addWitness}
          onRemoveWitness={removeWitness}
          onUpdateWitness={updateWitness}
        />
      </div>

      {/* Medical and Law information */}
      <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
        {showMedical && formData.medical && (
          <div className="w-full md:flex-1">
            <div className="space-y-4">
              <>
                <MedicalInformationSection data={formData.medical} onChange={updateSection("medical")} />
                <Button type="button" onClick={disableMedical} variant="link" className="w-full">
                  Remove Medical Information
                </Button>
              </>
            </div>
          </div>
        )}
        {showLawEnforcement && formData.lawEnforcement && (
          <div className="w-full md:flex-1">
            <div className="space-y-4">
              <>
                <LawEnforcementSection data={formData.lawEnforcement} onChange={updateSection("lawEnforcement")} />
                <Button type="button" onClick={disableLawEnforcement} variant="link" className="w-full">
                  Remove Law Enforcement Information
                </Button>
              </>
            </div>
          </div>
        )}
      </div>

      {/* Control and submit  */}
      <div className="flex w-full flex-col items-center justify-end gap-4 px-4 md:flex-row">
        {!showMedical && (
          <Button type="button" size="xl" className="w-full md:w-70" onClick={enableMedical} variant="default">
            <Ambulance />
            Add Medical Information
          </Button>
        )}
        {!showLawEnforcement && (
          <Button type="button" size="xl" className="w-full md:w-70" onClick={enableLawEnforcement} variant="default">
            <Scale />
            Add Law Enforcement Information
          </Button>
        )}
        <Button size="xl" type="submit" disabled={isSubmitting} variant="primary" className="w-full md:w-60">
          {isSubmitting ? <Loader className="animate-spin" /> : "SUBMIT INCIDENT REPORT"}
        </Button>
      </div>
    </form>
  );
}
