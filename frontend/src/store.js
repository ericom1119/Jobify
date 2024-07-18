import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import jobReducer from "./reducers/jobReducer";
import companyReducer from "./reducers/CompanyReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
    company: companyReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
