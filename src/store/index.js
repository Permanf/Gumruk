import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./reducers/auth";
import data from "./reducers/data";
// import logger from "redux-logger";

const reducer = combineReducers({
  auth,
  data,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
