import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { helpMailReducer } from "./public/helpSlice";
import { privateReducer } from "./private/privateSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    helpSlice: helpMailReducer,
    privateSlice: privateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this middleware
    }),
});
