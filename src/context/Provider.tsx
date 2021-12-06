import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DrinkObject, FoodObject } from '../interfaces';
import MyContext from './MyContext';

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [respostaDrink, setRespostaDrink] = useState([] as DrinkObject[]);
  const [respostaFood, setRespostaFood] = useState([] as FoodObject[]);
  const [ingredient, setIngredient] = useState<string>('');

  const context = {
    login,
    setLogin,
    respostaDrink,
    setRespostaDrink,
    respostaFood,
    setRespostaFood,
    ingredient,
    setIngredient,
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
