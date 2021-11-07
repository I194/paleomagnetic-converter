import React from "react";
import styles from "./FileOperationsBlock.module.scss";

import ConvertSelector from "../ConvertSelector/ConvertSelector";
import FileListBox from "../FileList/FileList";

const FileOperationsBlock = () => {


  return (
    <div>
      <ConvertSelector />
      <FileListBox source='output' width='60%' noFiles=' '/>
    </div>
  )
}

export default FileOperationsBlock;