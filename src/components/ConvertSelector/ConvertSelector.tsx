import React, { FunctionComponent } from "react";
import styles from "./ConvertSelector.module.scss";

import { toDIR, toPMCSV, toPMM, toPMXLSX } from "../../services/converters/dir";
import { useSelector } from "../../services/types/hooks";
import { IFormatButton } from "../../services/types/components";

const FormatButton: FunctionComponent<IFormatButton> = ({handleClick, files, children}) => {
  
  const disabled = !!!files?.length;

  return (
    <button 
      className={`${styles.btn} ${styles.btn__basic}`} 
      onClick={
        (event: React.MouseEvent) => files.map((file: File) => handleClick(children, file))
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const ConvertSelector = () => {

  const files = useSelector(state => state.files.inputFiles);

  const handleFormatSelect = (format: string, file: File) => {
    switch (format) {
      case 'DIR': return toDIR(file);
      case 'PMM': return toPMM(file);
      case 'CSV': return toPMCSV(file);
      case 'XLSX': return toPMXLSX(file); 
      default: return;
    }
  }

  return (
    <div className={styles.selectBlock}>
      <div className={styles.horizontalGroup}>
        <FormatButton handleClick={handleFormatSelect} files={files}>DIR</FormatButton>
        <FormatButton handleClick={handleFormatSelect} files={files}>PMM</FormatButton>
        <FormatButton handleClick={handleFormatSelect} files={files}>CSV</FormatButton>
        <FormatButton handleClick={handleFormatSelect} files={files}>XLSX</FormatButton>
      </div>
    </div>
  )
}

export default ConvertSelector;