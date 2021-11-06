import { Reducer } from "redux";
import { 
  SET_FILES,
  GET_FILES
} from "../actions/files";
import { IFiles } from "../types/components";
import { TFilesActions } from "../types/files";

const initialState: IFiles = {

  inputFiles: []

}

export const filesReducer: Reducer = (state = initialState, action: TFilesActions) => {
  switch (action.type) {
    case SET_FILES: {
      return {
        ...state,
        inputFiles: action.files
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