import React, { FunctionComponent, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { SET_INPUT_FILES } from '../../services/actions/files';
import { ITargetBox } from '../../services/types/components';

import { useDispatch, useSelector } from '../../services/types/hooks';
import { getFileName } from '../../utils/subFunctions';
import FileListBox from '../FileList/FileList';

import styles from './FileReader.module.scss';

const TargetBox: FunctionComponent<ITargetBox> = ({onDrop, onChange, avFormats}) => {

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

  const formats = avFormats.join(', .').toLowerCase().split('');
  formats.unshift('.'); 

  const isActive = canDrop && isOver;
  
  return (
    <div ref={drop}>
      <div className={`${styles.uploadButton} ${isActive ? styles.uploadButton__active : ''}`} >
        <input 
          type='file' 
          id='input'
          className={`${styles.inputFile}`}
          onChange={onChange}
          multiple={true}
          accept={formats.join('')}
        />
        <label htmlFor="input">{isActive ? 'Отпустите файл' : 'Перетащите или выберите файл'}</label>
      </div>
      <FileListBox source='input' height='90%' isActive={isActive} noFiles={ isActive ? 'Отпустите файл' : undefined }/>
    </div>
  )
}

const DnDFileInput = () => {

  const dispatch = useDispatch();

  const formats = useSelector(state => state.files.availableFormats);

  const isFileValid = (filename: string) => {
    if (!filename.includes('.')) return false;
    const ext = filename.split('.').pop()?.toUpperCase();
    return formats.includes(ext);
  }

  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files;
        for (let i = 0; i < files.length; i++) {
          if (!isFileValid(files[i].name)) return null;
        }
        dispatch({type: SET_INPUT_FILES, files: files});
      }
    },
    [],
  )

  const handleFileUpload = (event: any) => {
    const files = Array.from(event.currentTarget.files);
    dispatch({type: SET_INPUT_FILES, files: files});
  }

  return (
    <>
      <TargetBox onDrop={handleFileDrop} onChange={handleFileUpload} avFormats={formats}/>
    </>
  )
}

export default DnDFileInput;