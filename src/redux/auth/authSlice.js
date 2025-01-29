import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  register,
  logOut,
  refreshUser,
  resendVerificationEmail,
  updateUserInfo,
  updateUserAvatar,
} from "./operationsAuth";

const initialState = {
  user: null,
  token: null,
  avatarURL: null, // Add avatar URL here
  isLoading: false,
  isLoggedIn: false,
  isRegistered: false,
  isRefreshing: false,
  error: null,
  emailResendStatus: null,
  isLoggedOut: null,
  projects: [], // List of projects, each containing columns, each containing tasks
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
  if (!state.isLoggedIn) {
    state.user = null;
    state.token = null;
  }
  state.isRefreshing = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  if (!state.isRefreshing) {
    state.user = null;
    state.token = null;
    state.isLoggedIn = false;
  }
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      // Clear the entire auth state
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Log In
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.avatarURL = payload.user.avatarURL || null; // Set the avatar URL
        state.projects = payload.user.projects || []; // Populate projects
        state.isLoggedIn = payload.user.verify ? true : false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.isRegistered = false;
      })
      .addCase(logIn.rejected, handleRejected)

      // Register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.avatarURL = payload.user.avatarURL || null; // Set the avatar URL
        state.isLoggedIn = payload.user.verify ? true : false;
        state.isRegistered = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)

      // Log Out
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.avatarURL = null; // Clear avatar URL
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
        state.projects = [];
        state.isLoggedOut = true;
      })
      .addCase(logOut.rejected, handleRejected)

      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.avatarURL = payload.data.avatarURL || null; // Set the avatar URL
        state.projects = payload.data.projects || []; // Populate projects
        state.isLoggedIn = payload.data.verify ? true : false;
        state.isRefreshing = false;
        state.isLoggedOut = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })

      // Resend Verification Email
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailResendStatus = null;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, { payload }) => {
        state.emailResendStatus = payload;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailResendStatus = null;
        state.error = action.payload;
      })

      // Update User Info
      .addCase(updateUserInfo.pending, handlePending)
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.user = payload?.data?.user;
        state.avatarURL = payload?.data?.user?.avatarURL || null; // Set the avatar URL
        state.projects = payload?.data?.user?.projects || []; // Populate projects
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.emailResendStatus = "User updated suscesfully...!";
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update User Avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.avatarURL = payload.avatarUrl; // Set the new avatar URL
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      // Update User Avatar Rejected
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
