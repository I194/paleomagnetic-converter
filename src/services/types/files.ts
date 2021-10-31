import { 
  SET_FILES,
  GET_FILES,
} from "../actions/files";

export interface ISetFiles {
  readonly type: typeof SET_FILES;
  readonly files: File[];
}

export interface IGetFiles {
  readonly type: typeof GET_FILES;
}

export type TFilesActions =
  | ISetFiles
  | IGetFiles 