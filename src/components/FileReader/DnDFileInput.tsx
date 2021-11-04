import React, { FunctionComponent, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { SET_FILES } from '../../services/actions/files';
import { ITargetBox } from '../../services/types/components';

import { useDispatch } from '../../services/types/hooks';
import FileListBox from './FileList';

import styles from './FileReader.module.scss';

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
    <div ref={drop} className={`${isActive ? styles.activeBlock : ''}`}>
      <div className={`${styles.uploadButton}`}>
        {isActive ? 'Отпустите файл' : 'Перетащите или выберите файл'}
      </div>
      <FileListBox />
    </div>
  )
}

const DnDFileInput = () => {

  const dispatch = useDispatch();

  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files;
        dispatch({type: SET_FILES, files: files});
      }
    },
    [],
  )

  return (
    <>
      <TargetBox onDrop={handleFileDrop}/>
    </>
  )
}

export default DnDFileInput;