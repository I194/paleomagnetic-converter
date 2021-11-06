import React, { FunctionComponent } from 'react';
import { pmcsvToDir } from '../../services/converters/toDir';
import { IFileList } from '../../services/types/components';
import { useSelector } from '../../services/types/hooks';
import styles from './FileList.module.scss';

const FileListBox: FunctionComponent<IFileList> = ({ width, height, isActive, noFiles, source }) => {

  // eslint-disable-next-line no-eval
  const files = useSelector(state => state.files[`${source}Files`]);

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

  const componentWidth: string = width ? width : '100%';
  const componentHeight: string = height ? height : '100%';

  return (
    <div 
      className={`${styles.fileContainer} ${isActive ? styles.fileContainer__active : ''}`} 
      style={{width: componentWidth, height: componentHeight}}
    >
      {
        files?.length 
        ?
        <div className={styles.fileList}>
          <div className='lowerContainer'>
            {files.map((file: File, index: number) => dataToInfo(file, index))}
          </div>
        </div>
        :
        <div className={styles.noFiles}>
          { noFiles ? noFiles : 'Файлы отсутствуют' }
        </div>
      }
    </div>
  )
}

export default FileListBox;