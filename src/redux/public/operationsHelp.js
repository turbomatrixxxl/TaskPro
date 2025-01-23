import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for axios
axios.defaults.baseURL = "https://taskpro-nodejs.onrender.com";

// Async thunk for sending help email
export const sendHelpEmail = createAsyncThunk(
  "helpMail/sendHelpEmail",
  async ({ email, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/help-request", {
        email,
        comment,
      });
      return response.data; // Return the response data if successful
    } catch (error) {
      // Handle errors gracefully
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
