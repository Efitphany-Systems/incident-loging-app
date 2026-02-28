export interface Incident {
  id: string;
  time: string | null;
  type: string | null;
  location: string | null;
  severity: string | null;
}

export type Incidents = Incident[];
