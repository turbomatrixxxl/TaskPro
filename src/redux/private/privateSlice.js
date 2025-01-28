import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../auth/authSlice";

import {
  updateTheme,
  addProject,
  addColumn,
  updateColumn,
  addTask,
  updateTask,
  moveTask,
  deleteTask,
  deleteColumn,
  deleteProject,
  updateProjectAppearance,
} from "./operationsPrivate";

const initialState = {
  user: null,
  // Will hold the full user object from the backend
  filter: "Show all",
  isLoading: false,
  error: null,
  message: null,
};

// User slice
const privateSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    filterUser(state, action) {
      state.filter = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset, () => {
        // Reset to initial state on reset action
        return { ...initialState };
      })

      // Update theme reducers
      .addCase(updateTheme.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update the full user object, including the theme
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add project reducers
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.projects;
        // Update the entire user object, including projects
        state.message = action.payload.message;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add column reducers
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload);

        state.user = action.payload.project;

        state.message = action.payload.message;
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update column reducers
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.isLoading = false;

        // Update the specific column in the correct project
        state.user = action.payload.project;

        state.message = action.payload.message;
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add task reducers
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.column; // Update the full user object, including tasks within projects
        state.message = action.payload.message;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update task reducers
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.task; // The entire user object is returned after the task update
        state.message = action.payload.message;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Move task reducers
      .addCase(moveTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.task; // Update the entire user object with new project and task data
        state.message = action.payload.message;
      })
      .addCase(moveTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete task reducers
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.column; // Update the entire user object, including updated projects
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete column reducers
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.project; // Update the entire user object, including the updated projects
        state.message = action.payload.message;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete project reducers
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.projects; // Update the entire user object, including the updated projects after deleting a project
        state.message = action.payload.message;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update project appearance reducers
      .addCase(updateProjectAppearance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProjectAppearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.project; // Update the entire user object, including updated project appearance
        state.message = action.payload.message;
      })
      .addCase(updateProjectAppearance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, filterUser } = privateSlice.actions;

export const privateReducer = privateSlice.reducer;
