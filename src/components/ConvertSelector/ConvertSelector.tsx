import React, { FunctionComponent } from "react";
import { executeFunctionByName } from "../../utils/subFunctions";
import styles from "./ConvertSelector.module.scss";

import { toPMD, toDIR, toPMM } from "../../services/converters";
import { useSelector } from "../../services/types/hooks";
import { IFormatButton } from "../../services/types/components";

const FormatButton: FunctionComponent<IFormatButton> = ({handleClick, files, initialFormat, children}) => {
  
  const disabled = !!!files?.length;

  return (
    <button 
      className={`${styles.btn} ${styles.btn__basic}`} 
      onClick={
        (event: React.MouseEvent) => files.map((file: File) => handleClick(children, file, initialFormat))
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const ConvertSelector = () => {

  const files = useSelector(state => state.files.inputFiles);
  const formats = useSelector(state => state.files.availableFormats);

  const handleFormatSelect = (format: string, file: File, initialFormat: string) => {
    const csvName = `toCSV_${initialFormat}`;
    const xlsxName = `toXLSX_${initialFormat}`;

    switch (format) {
      case 'PMD': return toPMD(file);
      case 'DIR': return toDIR(file);
      case 'PMM': return toPMM(file);
      case 'CSV': return executeFunctionByName(csvName, window, file);
      case 'XLSX': return executeFunctionByName(xlsxName, window, file);
      default: return;
    }
  }

  const formatToBtn = (format: string) => {
    return (
      <FormatButton handleClick={handleFormatSelect} files={files} initialFormat={formats[0]}>
        {format}
      </FormatButton>
    )
  }

  return (
    <div className={styles.selectBlock}>
      <div className={styles.horizontalGroup}>
        {formats.map((format: string) => formatToBtn(format))}
      </div>
    </div>
  )
}

export default ConvertSelector;