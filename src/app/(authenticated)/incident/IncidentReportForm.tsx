"use client";

import { useState } from "react";

interface FormData {
  show: string;
  date: string;
  time: string;
  wearsGlasses: string;
  glassesInUse: string;
  patronName: string;
  patronPhone: string;
  patronEmail: string;
  patronAddress: string;
  patronCityState: string;
  patronContactTime: string;
  witnesses: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    contactTime: string;
    employmentType: string;
  }>;
  medical?: {
    visibleInjuries: string;
    visibleInjuriesExplain: string;
    medicalAttention: string;
    medicalServices: string;
    accepted: string;
    ambulanceRequested: string;
    ambulanceCompany: string;
    ambulanceDepart: string;
  };
  lawEnforcement?: {
    contacted: string;
    explanation: string;
    reportWritten: string;
    reportNumber: string;
    citation: string;
    officerName: string;
  };
}

export default function IncidentReportForm() {
  const [formData, setFormData] = useState<FormData>({
    show: "",
    date: "",
    time: "",
    wearsGlasses: "",
    glassesInUse: "",
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
        // Reset form
        setFormData({
          show: "",
          date: "",
          time: "",
          wearsGlasses: "",
          glassesInUse: "",
          patronName: "",
          patronPhone: "",
          patronEmail: "",
          patronAddress: "",
          patronCityState: "",
          patronContactTime: "",
          witnesses: [],
        });
      } else {
        alert("Error submitting report");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mandatory Sections */}
      <ShowInformationSection formData={formData} onChange={handleInputChange} />

      <PersonFillingSection formData={formData} onChange={handleInputChange} />

      <PatronInformationSection formData={formData} onChange={handleInputChange} />

      <WitnessSection
        witnesses={formData.witnesses}
        onAddWitness={addWitness}
        onRemoveWitness={removeWitness}
        onUpdateWitness={updateWitness}
      />

      {/* Optional Sections */}
      <div className="space-y-4">
        {!showMedical && (
          <Button
            type="button"
            onClick={() => setShowMedical(true)}
            className="bg-accent w-full py-3 font-bold text-white hover:bg-orange-700"
          >
            + Add Medical Information
          </Button>
        )}

        {showMedical && (
          <>
            <MedicalInformationSection
              data={formData.medical}
              onChange={(data) => handleInputChange("medical", data)}
            />
            <Button
              type="button"
              onClick={() => setShowMedical(false)}
              variant="outline"
              className="text-accent border-accent hover:bg-accent/10 w-full"
            >
              Remove Medical Information
            </Button>
          </>
        )}
      </div>

      <div className="space-y-4">
        {!showLawEnforcement && (
          <Button
            type="button"
            onClick={() => setShowLawEnforcement(true)}
            className="bg-accent w-full py-3 font-bold text-white hover:bg-orange-700"
          >
            + Add Law Enforcement Information
          </Button>
        )}

        {showLawEnforcement && (
          <>
            <LawEnforcementSection
              data={formData.lawEnforcement}
              onChange={(data) => handleInputChange("lawEnforcement", data)}
            />
            <Button
              type="button"
              onClick={() => setShowLawEnforcement(false)}
              variant="outline"
              className="text-accent border-accent hover:bg-accent/10 w-full"
            >
              Remove Law Enforcement Information
            </Button>
          </>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent w-full py-4 text-lg font-bold text-white hover:bg-orange-700"
      >
        {isSubmitting ? "Submitting..." : "SUBMIT INCIDENT REPORT"}
      </Button>
    </form>
  );
}
