export interface EventAndFillerInformation {
  category: string;
  show: string;
  wearsGlasses: string;
  inUse: string;
}

export interface PatronInformation {
  patronName: string;
  patronPhone: string;
  patronEmail: string;
  patronAddress: string;
  patronCityState: string;
  patronContactTime: string;
}

export interface WitnessInformation {
  id: string;
  name: string;
  phone: string;
  email: string;
  contactTime: string;
  employmentType: string;
}

export interface MedicalInformation {
  visibleInjuries: string;
  visibleInjuriesExplain: string;
  medicalAttention: string;
  offeredMedical: string;
  accepted: string;
  ambulanceRequested: string;
  ambulanceCompany: string;
  ambulanceEMT: string;
  didPatientLeaveAmbulance: string;
  whereTheyGo: string;
}

export interface LawEnforcementInformation {
  contacted: string;
  explanation: string;
  reportWritten: string;
  reportNumber: string;
  citation: string;
  officerName: string;
}

export interface IncidentFormData {
  eventAndFillerInformation: EventAndFillerInformation;
  patronInformation: PatronInformation;
  witnesses: Array<WitnessInformation>;
  medical?: MedicalInformation;
  lawEnforcement?: LawEnforcementInformation;
}

export interface EventAndFillerInformationProps {
  formData: EventAndFillerInformation;
  onChange: (field: keyof EventAndFillerInformation, value: any) => void;
}

export interface MedicalInformationProps {
  data: MedicalInformation;
  onChange: (field: keyof MedicalInformation, value: any) => void;
}

export interface LawEnforcementProps {
  data: LawEnforcementInformation;
  onChange: (field: keyof LawEnforcementInformation, value: any) => void;
}

/************************************ NEED TO REVIEW AND UPDATE ***********************************************************/

export interface Witness {
  id: string;
  name: string;
  phone: string;
  email: string;
  contactTime: string;
  employmentType: string;
}

export interface WitnessSectionProps {
  witnesses: Witness[];
  onAddWitness: () => void;
  onRemoveWitness: (id: string) => void;
  onUpdateWitness: (id: string, field: string, value: any) => void;
}
