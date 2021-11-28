import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  EDIT_COMPONENT,
  HANDLE_COMPONENT_EDIT_INPUT,
} from "../../constants/actionTypes";

const component = (state, { type, field, payload }) => {
  switch (type) {
    case COMPONENT_CREATE_SUCCESS:
      console.log("inside component success case");
      return {
        ...state,
        component: {
          ...state.component,
          loading: false,
          data: payload,
        },
      };
    case HANDLE_COMPONENT_EDIT_INPUT:
      return {
        ...state,
        component: {
          ...state.component,
          data: {
            ...state.data,
            [field]: payload,
          },
        },
      };
    case EDIT_COMPONENT:
      return {
        ...state,
        component: {
          ...state.component,
          data: {
            ...state.data,
            name: payload,
          },
        },
      };
    case COMPONENT_CREATE_ERROR:
      return {
        ...state,
        component: {
          ...state.component,
          loading: false,
          error: payload,
        },
      };
  }
};

export default component;
