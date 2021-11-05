import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DnDFileInput from './DnDFileInput';

const FileReader = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DnDFileInput />
    </DndProvider>
  )
}

export default FileReader;
