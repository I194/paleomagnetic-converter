import React from 'react';
import styles from './App.module.scss';

import FileReader from '../FileReader/FileReader';
import AppHeader from '../AppHeader/AppHeader';
import FileOperationsBlock from '../FileOperationsBlock/FileOperationsBlock';

function App() {
  return (
    <div className="App">
      <AppHeader />
        <div className={styles.containerMain}>
          <div className={`${styles.blockMain} text_main-large`}>
            <FileReader />
          </div>
          <div className={`${styles.blockMain} text_main-large`}>
            <FileOperationsBlock />
          </div>
        </div>
    </div>
  );
}

export default App;
