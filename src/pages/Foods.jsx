/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import { getNome } from '../services/getFood';

function Foods() {
  const { respostaFood, setRespostaFood } = useContext(MyContext);
  const DOUZE = 12;

  useEffect(() => {
    const callAPI = async () => {
      setRespostaFood(await getNome(''));
    };
    callAPI();
  }, []);

  if (respostaFood && respostaFood.length === 1) {
    return <Redirect to={ `/comidas/${respostaFood[0].idMeal}` } />;
  }
  if (respostaFood === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <HeaderWithSearchIcon title="Comidas" />
      { respostaFood && respostaFood.map(({ strMeal, strMealThumb }, index) => (
        <Cards
          key={ index }
          name={ strMeal }
          thumbnail={ strMealThumb }
          index={ index }
        />
      )).slice(0, DOUZE)}
    </div>
  );
}

export default Foods;
