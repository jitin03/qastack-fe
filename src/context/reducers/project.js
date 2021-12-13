const project = (state, { type, field, payload }) => {
  switch (type) {
    case "HANDLE_INPUT_TEXT":
      return {
        ...state,
        project: {
          ...state.project,
          [field]: payload,
        },
      };
    case "ADD_PROJECT":
      const newProject = [...state.projects, payload];

      return {
        ...state,
        projects: newProject,
      };

    case "EDIT_PROJECT":
      const specificProject = state.projects.find(
        (item) => item.name === payload.name
      );

      return {
        ...state,
        project: {
          ...state.project,
          name: payload,
          isEditing: true,
        },
      };

    case "RESET_PROJECT_FORM":
      return {
        ...state,
        project: {
          ...state.project,
          name: "",
          isEditing: false,
        },
      };
    case "CLEAR_ADD_PROJECT": {
      return {
        ...state,
        project: {
          ...state.project,
        },
      };
    }
    default:
      return state;
  }
};

export default project;
