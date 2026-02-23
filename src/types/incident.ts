export interface IncidentFormData {
  show: string;
  wearsGlasses: string;
  inUse: string;
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

export interface FormSectionProps {
  formData: IncidentFormData;
  onChange: <K extends keyof IncidentFormData>(field: K, value: IncidentFormData[K]) => void;
}

interface MedicalData {
  visibleInjuries?: string;
  visibleInjuriesExplain?: string;
  medicalAttention?: string;
  offeredMedical?: string;
  accepted?: string;
  ambulanceRequested?: string;
  ambulanceCompany?: string;
  ambulanceEMT?: string;
  didPatientLeaveAmbulance?: string;
  whereTheyGo?: string;
}

export interface MedicalInformationProps {
  data?: MedicalData;
  onChange: (data: MedicalData) => void;
}

interface LawEnforcementData {
  contacted?: string;
  explanation?: string;
  reportWritten?: string;
  reportNumber?: string;
  citation?: string;
  officerName?: string;
}

export interface LawEnforcementProps {
  data?: LawEnforcementData;
  onChange: (data: LawEnforcementData) => void;
}
