import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  ADD_JOB_SUCCESS,
  UPDATE_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
} from "../actions/jobActions";

const initialState = {
  loading: false,
  jobs: [],
  error: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return { ...state, loading: true };
    case FETCH_JOBS_SUCCESS:
      return { ...state, loading: false, jobs: action.payload };
    case FETCH_JOBS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_JOB_SUCCESS:
      return { ...state, jobs: [...state.jobs, action.payload] };
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    default:
      return state;
  }
};

export default jobReducer;
