import { IncidentFormData } from "@/types/incident";
import { useState } from "react";

export function useIncidentForm(initialCategory: string) {
  const [showMedical, setShowMedical] = useState(false);
  const [showLawEnforcement, setShowLawEnforcement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const defaultMedical: IncidentFormData["medical"] = {
    visibleInjuries: "yes",
    visibleInjuriesExplain: "",
    medicalAttention: "yes",
    offeredMedical: "yes",
    accepted: "accepted",
    ambulanceRequested: "yes",
    ambulanceCompany: "",
    ambulanceEMT: "",
    didPatientLeaveAmbulance: "yes",
    whereTheyGo: "",
  };
  const defaultLawEnforcement: IncidentFormData["lawEnforcement"] = {
    contacted: "yes",
    explanation: "",
    reportWritten: "yes",
    reportNumber: "",
    citation: "",
    officerName: "",
  };
  const [formData, setFormData] = useState<IncidentFormData>({
    eventAndFillerInformation: {
      category: initialCategory,
      show: "",
      wearsGlasses: "yes",
      inUse: "yes",
    },
    patronInformation: {
      patronName: "",
      patronPhone: "",
      patronEmail: "",
      patronAddress: "",
      patronCityState: "",
      patronContactTime: "",
    },
    witnesses: [],
    medical: undefined,
    lawEnforcement: undefined,
  });

  const updateSection =
    <K extends keyof IncidentFormData>(section: K) =>
    (field: string, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
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

  const enableMedical = () => {
    setFormData((prev) => ({
      ...prev,
      medical: prev.medical ?? { ...defaultMedical },
    }));
    setShowMedical(true);
  };

  const disableMedical = () => {
    setShowMedical(false);
    setFormData((prev) => ({
      ...prev,
      medical: undefined,
    }));
  };

  const enableLawEnforcement = () => {
    setFormData((prev) => ({
      ...prev,
      lawEnforcement: prev.lawEnforcement ?? { ...defaultLawEnforcement },
    }));
    setShowLawEnforcement(true);
  };

  const disableLawEnforcement = () => {
    setShowLawEnforcement(false);
    setFormData((prev) => ({
      ...prev,
      lawEnforcement: undefined,
    }));
  };

  const resetForm = () => {
    setFormData({
      eventAndFillerInformation: {
        category: initialCategory,
        show: "",
        wearsGlasses: "yes",
        inUse: "yes",
      },
      patronInformation: {
        patronName: "",
        patronPhone: "",
        patronEmail: "",
        patronAddress: "",
        patronCityState: "",
        patronContactTime: "",
      },
      witnesses: [],
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/incident-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Incident report submitted successfully!");
        resetForm();
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateSection,
    addWitness,
    removeWitness,
    updateWitness,
    showMedical,
    enableMedical,
    disableMedical,
    showLawEnforcement,
    enableLawEnforcement,
    disableLawEnforcement,
    setShowLawEnforcement,
    isSubmitting,
    handleSubmit,
  };
}
