export interface Staff {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: "admin" | "staff" | "supervisor";
}

export interface UpdateUserPayload {
  email: string;
  password?: string;
}
