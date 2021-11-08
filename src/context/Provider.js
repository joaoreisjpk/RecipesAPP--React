import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [respostaDrink, setRespostaDrink] = useState(undefined);
  const [respostaFood, setRespostaFood] = useState(undefined);

  const context = {
    login,
    setLogin,
    respostaDrink,
    setRespostaDrink,
    respostaFood,
    setRespostaFood,
  };
  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
