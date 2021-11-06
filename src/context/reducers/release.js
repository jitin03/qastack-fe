const release = (state, { type, field, payload }) => {
  switch (type) {
    case "HANDLE_INPUT_TEXT":
      return {
        ...state,
        release: {
          ...state.release,
          [field]: payload,
        },
      };
    case "ADD_RELEASE":
      const newRelease = [...state.releases, payload];
      console.log(newRelease);
      return {
        ...state,
        releases: newRelease,
      };
      console.log(state);
    default:
      return state;
  }
};

export default release;
