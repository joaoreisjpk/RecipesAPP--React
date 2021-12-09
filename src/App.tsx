import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './components/Switcher';
import Provider from './context/Provider';

import './global.scss';
import './styles/loginPage.scss';

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
