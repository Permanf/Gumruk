import { combineReducers } from "redux";
import authReducer from "./auth";
import dataReducer from "./data";

const rootReducers = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

export default rootReducers;
