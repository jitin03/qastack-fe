import {
  EDIT_RELEASE,
  RELEASE_CREATE_SUCCESS,
} from "../../constants/actionTypes";

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
    case RELEASE_CREATE_SUCCESS:
      return {
        ...state,
        release: {
          ...state.release,
          loading: false,
          data: payload,
        },
      };
    case EDIT_RELEASE:
      return {
        ...state,
        release: {
          ...state.release,
          data: {
            ...state.data,
            ReleaseName: payload,
          },
        },
      };

    default:
      return state;
  }
};

export default release;
