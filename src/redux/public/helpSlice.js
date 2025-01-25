import { createSlice } from "@reduxjs/toolkit";
import { sendHelpEmail } from "./operationsHelp";
import { reset } from "../auth/authSlice";

const initialState = {
  email: "",
  comment: "",
  successMessage: null,
  loading: false,
  error: null,
};

const helpMailSlice = createSlice({
  name: "helpMail",
  initialState: initialState,
  reducers: {
    setHelpFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetHelpForm: (state) => {
      state.email = "";
      state.comment = "";
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset, () => {
        // Reset to initial state on reset action
        return { ...initialState };
      })

      .addCase(sendHelpEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendHelpEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(sendHelpEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send help email.";
      });
  },
});

export const { setHelpFormData, resetHelpForm } = helpMailSlice.actions;

export const helpMailReducer = helpMailSlice.reducer;
