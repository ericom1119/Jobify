import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  ADD_COMPANY_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
} from "../actions/CompanyActions";

const initialState = {
  loading: false,
  companies: [],
  error: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMPANY_SUCCESS:
      return { ...state, loading: false, companies: action.payload };
    case FETCH_COMPANY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_COMPANY_SUCCESS:
      return { ...state, companies: [...state.companies, action.payload] };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.map((company) =>
          company._id === action.payload._id ? action.payload : company
        ),
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default companyReducer;
