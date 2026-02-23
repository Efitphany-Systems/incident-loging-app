"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import PatronInformationSection from "./PatronInformationSection";
import WitnessSection from "./WitnessSection";
import MedicalInformationSection from "./MedicalInformationSection";
import LawEnforcementSection from "./LawEnforcementSection";
import MandatoryInformation from "./BasicInformation";
import { IncidentFormData } from "@/types/incident";
import { Ambulance, Loader, Scale } from "lucide-react";

export default function IncidentReportForm() {
  // Move this state hasndling to redux in future
  const [formData, setFormData] = useState<IncidentFormData>({
    show: "",
    wearsGlasses: "yes",
    inUse: "yes",
    patronName: "",
    patronPhone: "",
    patronEmail: "",
    patronAddress: "",
    patronCityState: "",
    patronContactTime: "",
    witnesses: [],
  });

  const [showMedical, setShowMedical] = useState(false);
  const [showLawEnforcement, setShowLawEnforcement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addWitness = () => {
    const newWitness = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      email: "",
      contactTime: "",
      employmentType: "non-employee",
    };
    setFormData((prev) => ({
      ...prev,
      witnesses: [...prev.witnesses, newWitness],
    }));
  };

  const removeWitness = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      witnesses: prev.witnesses.filter((w) => w.id !== id),
    }));
  };

  const updateWitness = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      witnesses: prev.witnesses.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/incident-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Incident report submitted successfully!");
        setFormData({
          show: "",
          wearsGlasses: "yes",
          inUse: "yes",
          patronName: "",
          patronPhone: "",
          patronEmail: "",
          patronAddress: "",
          patronCityState: "",
          patronContactTime: "",
          witnesses: [],
        });
      } else {
        // alert("Error submitting report");
      }
    } catch (error) {
      console.error("Submit error:", error);
      // alert("Error submitting report");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 30000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* {JSON.stringify(formData)} */}

      <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
        <div className="w-full md:flex-1">
          <MandatoryInformation formData={formData} onChange={handleInputChange} />
        </div>
        <div className="w-full md:flex-1">
          <PatronInformationSection formData={formData} onChange={handleInputChange} />
        </div>
      </div>

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
        <div className="w-full md:flex-1">
          <div className="space-y-4">
            {showMedical && (
              <>
                <MedicalInformationSection
                  data={formData.medical}
                  onChange={(data) => handleInputChange("medical", data)}
                />
                <Button type="button" onClick={() => setShowMedical(false)} variant="link" className="w-full">
                  Remove Medical Information
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="w-full md:flex-1">
          <div className="space-y-4">
            {showLawEnforcement && (
              <>
                <LawEnforcementSection
                  data={formData.lawEnforcement}
                  onChange={(data) => handleInputChange("lawEnforcement", data)}
                />
                <Button type="button" onClick={() => setShowLawEnforcement(false)} variant="link" className="w-full">
                  Remove Law Enforcement Information
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-end gap-4 px-4 md:flex-row">
        {!showMedical && (
          <Button
            type="button"
            size="xl"
            className="w-full md:w-70"
            onClick={() => setShowMedical(true)}
            variant="destructive"
          >
            <Ambulance />
            Add Medical Information
          </Button>
        )}
        {!showLawEnforcement && (
          <Button
            type="button"
            size="xl"
            className="w-full bg-amber-500 md:w-70"
            onClick={() => setShowLawEnforcement(true)}
            variant="primary"
          >
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
