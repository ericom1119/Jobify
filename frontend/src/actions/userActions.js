import api from "../api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { access: token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      dispatch({ type: LOGIN_SUCCESS, payload: { token } });
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.error || "Login failed",
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
