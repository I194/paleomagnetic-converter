export interface ITargetBox {
  onDrop: (item: { files: any[] }) => void
}

export interface IFiles {
  files: File[];
}