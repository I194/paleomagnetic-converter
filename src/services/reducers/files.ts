import { Reducer } from "redux";
import { 
  SET_FILES,
  GET_FILES
} from "../actions/files";
import { IFiles } from "../types/components";
import { TFilesActions } from "../types/files";

const initialState: IFiles = {

  files: []

}

export const filesReducer: Reducer = (state = initialState, action: TFilesActions) => {
  switch (action.type) {
    case SET_FILES: {
      return {
        ...state,
        files: action.files
      }
    }
    case GET_FILES: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}