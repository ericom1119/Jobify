import api from "../api";

export const FETCH_JOBS_REQUEST = "FETCH_JOBS_REQUEST";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";
export const ADD_JOB_SUCCESS = "ADD_JOB_SUCCESS";
export const UPDATE_JOB_SUCCESS = "UPDATE_JOB_SUCCESS";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";

export const fetchJobs = () => async (dispatch) => {
  dispatch({ type: FETCH_JOBS_REQUEST });
  try {
    const response = await api.get("/getAlljob");
    dispatch({ type: FETCH_JOBS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
  }
};

export const addJob = (jobData) => async (dispatch) => {
  try {
    const response = await api.post("/addJob", jobData);
    dispatch({ type: ADD_JOB_SUCCESS, payload: response.data });
    dispatch(fetchJobs());
  } catch (error) {
    console.error("Error adding job:", error);
  }
};

export const updateJob = (jobId, updatedJobData) => async (dispatch) => {
  try {
    const response = await api.put(`/editJob/${jobId}`, updatedJobData);
    dispatch({ type: UPDATE_JOB_SUCCESS, payload: response.data });
    dispatch(fetchJobs());
  } catch (error) {
    console.error("Error updating job:", error);
  }
};

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    await api.delete(`/deleteJob/${jobId}`);
    dispatch({ type: DELETE_JOB_SUCCESS, payload: jobId });
    dispatch(fetchJobs());
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};
