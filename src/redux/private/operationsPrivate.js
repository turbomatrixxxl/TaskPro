import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set Axios base URL
axios.defaults.baseURL = "https://taskpro-nodejs.onrender.com";

// Set Authorization header
const setAuthHeader = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    console.error("Token not found or expired. Please log in.");
  }
};

// Async thunk for updating the theme
export const updateTheme = createAsyncThunk(
  "user/updateTheme",
  async (theme, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.patch("/api/theme", { theme });
      return response.data.updatedTheme; // Extract the updated user object from the response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for adding a project
export const addProject = createAsyncThunk(
  "user/addProject",
  async ({ name, icon = 0, background = "none" }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.post("/api/projects", {
        name,
        icon,
        background,
      });

      return response.data; // Extract the updated user object from the response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for adding a column
export const addColumn = createAsyncThunk(
  "user/addColumn",
  async ({ projectName, columnName }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.post(
        `/api/projects/${projectName}/columns`,
        {
          columnName,
        }
      );
      return response.data; // Extract the updated user object with the project
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for updating a column title
export const updateColumn = createAsyncThunk(
  "user/updateColumn",
  async ({ projectName, columnName, newColumnName }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.patch(
        `/api/projects/${projectName}/column/${columnName}`,
        { name: newColumnName }
      );
      return response.data; // Extract the updated user object with the project
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for adding a task
export const addTask = createAsyncThunk(
  "user/addTask",
  async ({ projectName, columnName, taskData }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.post(
        `/api/projects/${projectName}/columns/${columnName}/tasks`,
        taskData
      );
      return response.data; // Return the full user object from the response, which contains the updated projects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for updating a task
export const updateTask = createAsyncThunk(
  "user/updateTask",
  async (
    { projectName, columnName, taskName, updates },
    { rejectWithValue }
  ) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.patch(
        `/api/projects/${projectName}/column/${columnName}/tasks/${taskName}`,
        updates
      );
      return response.data; // Extract the updated user object (which includes projects)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for moving a task
export const moveTask = createAsyncThunk(
  "user/moveTask",
  async (
    { projectName, columnName, taskName, toColumnName },
    { rejectWithValue }
  ) => {
    try {
      setAuthHeader(); // Ensure token is set in headers

      // Send a patch request to move the task
      const response = await axios.patch(
        `/api/projects/${projectName}/column/${columnName}/tasks/${taskName}/move`,
        { toColumnName: toColumnName }
      );

      // Return the updated user object, which includes updated projects
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async ({ projectName, columnName, taskName }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.delete(
        `/api/projects/${projectName}/columns/${columnName}/tasks/${taskName}`
      );
      return response.data; // Return the updated user object, which includes the projects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for deleting a column
export const deleteColumn = createAsyncThunk(
  "user/deleteColumn",
  async ({ projectName, columnName }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.delete(
        `/api/projects/${projectName}/columns/${columnName}`
      );
      return response.data; // Return the updated user object, including the updated projects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  "user/deleteProject",
  async ({ projectName }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers
      const response = await axios.delete(`/api/projects/${projectName}`);
      return response.data; // Return the updated user object, including the updated projects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for updating the project appearance
export const updateProjectAppearance = createAsyncThunk(
  "user/updateProjectAppearance",
  async ({ projectName, updates }, { rejectWithValue }) => {
    try {
      setAuthHeader(); // Ensure token is set in headers

      // Convert projectName to a string to avoid any issues
      const projectNameString = String(projectName);

      const response = await axios.patch(
        `/api/projects/${projectNameString}/appearance`,
        updates
      );
      return response.data; // Return the updated user object, including the updated project
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
