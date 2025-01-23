import { createSelector } from "@reduxjs/toolkit";

// Selector to get the entire helpMail state
export const selectHelpMailState = (state) => state.helpMail;

// Selector to get the email value from the state
export const selectHelpEmail = createSelector(
  selectHelpMailState,
  (helpMailState) => helpMailState.email
);

// Selector to get the comment value from the state
export const selectHelpComment = createSelector(
  selectHelpMailState,
  (helpMailState) => helpMailState.comment
);

// Selector to get the loading status
export const selectHelpLoading = createSelector(
  selectHelpMailState,
  (helpMailState) => helpMailState.loading
);

// Selector to get the success message
export const selectHelpSuccessMessage = createSelector(
  selectHelpMailState,
  (helpMailState) => helpMailState.successMessage
);

// Selector to get the error message
export const selectHelpError = createSelector(
  selectHelpMailState,
  (helpMailState) => helpMailState.error
);
