import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Foods() {
  const { respostaFood } = useContext(MyContext);
  const DOUZE = 12;

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
      <Footer />
    </div>
  );
}

export default Foods;
