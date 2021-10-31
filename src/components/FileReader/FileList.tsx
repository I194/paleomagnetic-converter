import React from 'react';
import { pmcsvToDir } from '../../services/converters/toDir';
import { useSelector } from '../../services/types/hooks';
import styles from './FileReader.module.css';

const FileListBox = () => {

  const files = useSelector(state => state.files.files);

  const dataToInfo = (file: File, index: number) => {
    pmcsvToDir(file);
    return (
      <div className={`${styles.fileRow} text_main-small`} key={index}>
        <p className={`${styles.fileName}`}>{file.name}</p>
        {/* <p>{file.type}</p>
        <p>{(file.size / 1024).toFixed(0)} Кб</p> */}
      </div>
    )
  }

  return (
    <div className={styles.fileContainer}>
      {
        files.length 
        ?
        <div className={styles.fileList}>
          {files.map((file: File, index: number) => dataToInfo(file, index))}
        </div>
        :
        <div className={styles.noFiles}>
          Файлы отсутствуют
        </div>
      }
    </div>
  )
}

export default FileListBox;