import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/userActions";

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
