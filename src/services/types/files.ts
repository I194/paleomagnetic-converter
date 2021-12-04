import { 
  SET_INPUT_FILES,
  GET_INPUT_FILES,
  SET_OUTPUT_FILES,
  GET_OUTPUT_FILES,
  SET_AVAILABLE_FORMATS,
} from "../actions/files";

export interface ISetInputFiles {
  readonly type: typeof SET_INPUT_FILES;
  readonly files: File[];
}

export interface IGetInputFiles {
  readonly type: typeof GET_INPUT_FILES;
}

export interface ISetOutputFiles {
  readonly type: typeof SET_OUTPUT_FILES;
  readonly files: File[];
}

export interface IGetOutputFiles {
  readonly type: typeof GET_OUTPUT_FILES;
}

export interface ISetAvailableFormats {
  readonly type: typeof SET_AVAILABLE_FORMATS;
  readonly formats: string[];
}


export type TFilesActions =
  | ISetInputFiles
  | IGetInputFiles 
  | ISetOutputFiles
  | IGetOutputFiles 
  | ISetAvailableFormats