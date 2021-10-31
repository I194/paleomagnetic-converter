import { combineReducers } from "redux";
import { filesReducer } from "./files";

export const rootReducer = combineReducers({
  files: filesReducer
})