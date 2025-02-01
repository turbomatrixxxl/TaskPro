import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Set the base URL for axios
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://taskpro-nodejs.onrender.com";

// Function to set the Authorization header and store the token in localStorage
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", JSON.stringify(token)); // Save token in localStorage
};

// Function to clear the Authorization header and remove the token from localStorage
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token"); // Remove token from localStorage
};

// Thunk for logging in
export const logIn = createAsyncThunk(
  "auth/login", // Unique string identifier for this action
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", credentials);

      const { token, user } = response.data;
      // console.log(user);

      if (user.verify === false) {
        localStorage.removeItem("token");
        // User is not verified; don't set the auth token
        return { user, token: null }; // Return user data without setting the token
      }

      setAuthHeader(token); // Set the token only for verified users
      return response.data; // Return user and token
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for registering
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/signup", credentials);
      const { user, token } = response.data;

      // If the user is unverified, don't store the token
      if (user.verify === false) {
        return { user, token: null }; // Return unverified user with null token
      }

      // Set the auth token only for verified users
      setAuthHeader(token);
      return response.data; // Return user and token for verified users
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Send the logout request to the server (optional, depends on your API design)
    const response = await axios.post("/api/users/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Using the current token
      },
    });

    // Clear the Authorization header and token from localStorage
    clearAuthHeader(); // Clears both the axios Authorization header and localStorage

    return response.data; // Optionally, you can return any data (empty here as we don't need to send any data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Handle logout error
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token === null || !token) {
      return thunkAPI.rejectWithValue("Unable to fetch user: No token found");
    }
    try {
      setAuthHeader(token);
      const response = await axios.get("/api/users/current");
      // console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// resend verification mail
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/verify", { email });
      return response.data.message; // Return success message
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update User Info
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (userData, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.patch("/api/users/update", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data; // Return updated user data including projects, columns, tasks
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update User Avatar
export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (formData, thunkAPI) => {
    // console.log("formData from ops :", formData);

    // Manually log FormData entries to check the contents
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value); // Log key-value pairs in FormData
    //   console.log("ops");
    // }

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.patch("/api/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Form data:", formData);
      // console.log("Headers:", {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // });

      return response.data; // Return the new avatar URL
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
