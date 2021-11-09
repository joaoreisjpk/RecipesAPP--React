/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import { getDrinkNome } from '../services/getDrink';

function Drinks() {
  const { respostaDrink, setRespostaDrink } = useContext(MyContext);
  const TREZE = 12;

  useEffect(() => {
    const callAPI = async () => {
      setRespostaDrink(await getDrinkNome(''));
    };
    callAPI();
  }, []);

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].idDrink}` } />;
  }
  if (respostaDrink === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <HeaderWithSearchIcon title="Comidas" />
      { respostaDrink && respostaDrink.map((item, index) => (
        <Cards
          key={ index }
          thumbnail={ item.strDrinkThumb }
          index={ index }
          name={ item.strDrink }
        />
      )).slice(0, TREZE)}
    </div>
  );
}

export default Drinks;
