import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switcher from './components/Switcher';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switcher />
    </Provider>
  );
}

export default App;
