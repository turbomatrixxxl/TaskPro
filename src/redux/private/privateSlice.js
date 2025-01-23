import { createSlice } from "@reduxjs/toolkit";
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

// User slice
const privateSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Will hold the full user object from the backend
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.user = action.payload; // Update the entire user object, including projects
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

        // Find and update the specific project with the new column
        const updatedProject = action.payload;
        const projectIndex = state.user.projects.findIndex(
          (project) => project.name === updatedProject.name
        );
        if (projectIndex !== -1) {
          state.user.projects[projectIndex] = updatedProject;
        }
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
        const updatedProject = action.payload;
        const projectIndex = state.user.projects.findIndex(
          (project) => project.name === updatedProject.name
        );
        if (projectIndex !== -1) {
          state.user.projects[projectIndex] = updatedProject;
        }
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
        state.user = action.payload; // Update the full user object, including tasks within projects
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
        state.user = action.payload; // The entire user object is returned after the task update
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
        state.user = action.payload; // Update the entire user object with new project and task data
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
        state.user = action.payload; // Update the entire user object, including updated projects
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
        state.user = action.payload; // Update the entire user object, including the updated projects
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
        state.user = action.payload; // Update the entire user object, including the updated projects after deleting a project
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
        state.user = action.payload; // Update the entire user object, including updated project appearance
      })
      .addCase(updateProjectAppearance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = privateSlice.actions;

export const privateReducer = privateSlice.reducer;
