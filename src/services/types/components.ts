import { ChangeEventHandler } from "react";

export interface ITargetBox {
  onDrop: (item: { files: any[] }) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface IFiles {
  files: File[];
}