import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { IFileListBox, ITargetBox } from '../../services/types/components';

import styles from './FileReader.module.css';

const TargetBox: FunctionComponent<ITargetBox> = ({onDrop}) => {

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        if (onDrop) {
          onDrop(item);
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  
  return (
    <div ref={drop} className={styles.targetBox}>
      {isActive ? 'Отпустите файл' : 'Перетащите сюда файл'}
    </div>
  )
}

const FileListBox: FunctionComponent<IFileListBox> = ({files}) => {

  const dataToInfo = (file: File, index: number) => {
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
          {files.map((file, index) => dataToInfo(file, index))}
        </div>
        :
        <div className={styles.noFiles}>
          Файлы отсутствуют
        </div>
      }
    </div>
  )
}

const DnDFileInput = () => {

  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files;
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles],
  )

  return (
    <>
      <TargetBox onDrop={handleFileDrop}/>
      <FileListBox files={droppedFiles} />
    </>
  )
}

export default DnDFileInput;