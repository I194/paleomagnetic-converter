import { Reducer } from "redux";
import { 
  SET_INPUT_FILES,
  GET_INPUT_FILES,
  SET_OUTPUT_FILES,
  GET_OUTPUT_FILES
} from "../actions/files";
import { IFiles } from "../types/components";
import { TFilesActions } from "../types/files";

const initialState: IFiles = {

  inputFiles: [],
  outputFiles: []

}

export const filesReducer: Reducer = (state = initialState, action: TFilesActions) => {
  switch (action.type) {
    case SET_INPUT_FILES: {
      return {
        ...state,
        inputFiles: action.files
      }
    }
    case GET_INPUT_FILES: {
      return {
        ...state
      }
    }
    case SET_OUTPUT_FILES: {
      return {
        ...state,
        outputFiles: action.files
      }
    }
    case GET_OUTPUT_FILES: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}