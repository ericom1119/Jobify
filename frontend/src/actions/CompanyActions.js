import api from "../api";

export const FETCH_COMPANY_REQUEST = "FETCH_COMPANY_REQUEST";
export const FETCH_COMPANY_SUCCESS = "FETCH_COMPANY_SUCCESS";
export const FETCH_COMPANY_FAILURE = "FETCH_COMPANY_FAILURE";
export const ADD_COMPANY_SUCCESS = "ADD_COMPANY_SUCCESS";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESS";
export const DELETE_COMPANY_SUCCESS = "DELETE_COMPANY_SUCCESS";

export const fetchCompany = () => async (dispatch) => {
  dispatch({ type: FETCH_COMPANY_REQUEST });
  try {
    const response = await api.get("/getAllcompany");
    dispatch({ type: FETCH_COMPANY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COMPANY_FAILURE, payload: error.message });
  }
};

export const addCompany = (companyData) => async (dispatch) => {
  try {
    const response = await api.post("/addCompany", companyData);
    dispatch({ type: ADD_COMPANY_SUCCESS, payload: response.data });
    dispatch(fetchCompany());
  } catch (error) {
    console.error("Error adding Company:", error);
  }
};

export const checkCompanyExists = (name) => async () => {
  try {
    const response = await api.get(`/checkCompanyExists?name=${name}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking Company existence:", error);
    return false;
  }
};

export const updateCompany =
  (companyId, updatedCompanyData) => async (dispatch) => {
    try {
      const response = await api.put(
        `/editCompany/${companyId}`,
        updatedCompanyData
      );
      dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: response.data });
      dispatch(fetchCompany());
    } catch (error) {
      console.error("Error updating Company:", error);
    }
  };

export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    await api.delete(`/deleteCompany/${companyId}`);
    dispatch({ type: DELETE_COMPANY_SUCCESS, payload: companyId });
    dispatch(fetchCompany());
  } catch (error) {
    console.error("Error deleting Company:", error);
  }
};
