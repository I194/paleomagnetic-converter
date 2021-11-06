import { ChangeEventHandler } from "react";

export interface ITargetBox {
  onDrop: (item: { files: any[] }) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface IFiles {
  inputFiles: File[];
}

export interface IFileList {
  width?: string;
  height?: string;
  isActive?: boolean;
  noFiles?: string;
  source: string;
}