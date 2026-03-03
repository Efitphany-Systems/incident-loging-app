import { AuthState } from "@/types/store/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  name: "",
  email: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, payload) => {
      state = { ...state, ...payload.payload };
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
