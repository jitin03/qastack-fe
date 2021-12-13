import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_USER_DETAIL,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";

const auth = (state, { type, field, payload }) => {
  switch (type) {
    case "HANDLE_INPUT_TEXT":
      return {
        ...state,
        auth: {
          ...state.auth,
          data: { ...state.auth.data, [field]: payload },
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: payload,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: payload,
        },
      };
    case LOGIN_USER_DETAIL:
      return {
        ...state,
        loggedIn: {
          ...state.loggedIn,
          loading: false,
          data: payload,
        },
      };

    case REGISTER_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: payload,
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: payload,
        },
      };

    case REGISTER_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default auth;
