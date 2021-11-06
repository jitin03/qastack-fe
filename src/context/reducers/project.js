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
      console.log("inside edit project redcuer", payload);
      const specificProject = state.projects.find(
        (item) => item.name === payload.name
      );
      console.log(specificProject);
      return {
        ...state,
        project: {
          ...state.project,
          name: payload,
          isEditing: true,
        },
      };

    case "RESET_PROJECT_FORM":
      console.log("call reset project reducer");
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
