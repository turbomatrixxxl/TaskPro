export const selectUser = (state) => state.privateSlice.user; // Corrected to access the user object
export const selectIsLoading = (state) => state.privateSlice.isLoading; // Directly accessing isLoading
export const selectError = (state) => state.privateSlice.error; // Directly accessing error

export const selectProjectByName = (state, projectName) =>
  state.privateSlice.user.projects.find(
    (project) => project.name === projectName
  );

export const selectColumnByName = (state, projectName, columnName) => {
  const project = state.privateSlice.user.projects.find(
    (project) => project.name === projectName
  );
  return project?.columns.find((column) => column.name === columnName);
};
