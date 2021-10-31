import React from 'react';
import './App.css';

import FileReader from '../FileReader/FileReader';
import AppHeader from '../AppHeader/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <FileReader />
    </div>
  );
}

export default App;
