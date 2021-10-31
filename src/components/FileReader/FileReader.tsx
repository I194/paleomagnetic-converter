import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './FileReader.module.css';

import DnDFileInput from './DnDFileInput';
import FileListBox from './FileList';

const FileReader = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.containerMain}>
        <div className={`${styles.blockMain} text_main-large`}>
          <DnDFileInput />
          <FileListBox />
        </div>
        <div className={`${styles.blockMain} text_main-large`}>
          FileOutput
        </div>
    </div>
    </DndProvider>
  )
}

export default FileReader;
