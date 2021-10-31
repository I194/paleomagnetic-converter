export interface ITargetBox {
  onDrop: (item: { files: any[] }) => void
}

export interface IFileListBox {
  files: File[];
}