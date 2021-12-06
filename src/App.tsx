import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './components/Switcher';
import Provider from './context/Provider';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider>
          <Switcher />
        </Provider>
      </BrowserRouter>
    );
  }
}
