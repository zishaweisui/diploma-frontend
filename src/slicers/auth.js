import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: "",
    refresh: "",
  },
  reducers: {
    setTokens: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    clearTokens: (state) => {
      state.access = "";
      state.refresh = "";
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
