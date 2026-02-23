import { IncidentFormData } from "@/types/incident";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IncidentFormData = {
  showMedical: false,
  showLawEnforcement: false,
  loading: false,
  eventAndFillerInformation: {
    category: "",
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
};

const incidentSlice = createSlice({
  name: "incident",
  initialState,
  reducers: {
    setForm: (state, payload) => {
      state = { ...state, ...payload.payload };
    },
  },
});

export const { setForm } = incidentSlice.actions;
export default incidentSlice.reducer;
