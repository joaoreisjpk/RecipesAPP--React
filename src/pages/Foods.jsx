import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';

function Foods() {
  const { respostaFood } = useContext(MyContext);

  if (respostaFood && respostaFood.length === 1) {
    return <Redirect to={ `/comidas/${respostaFood[0].idMeal}` } />;
  }
  // console.log(respostaFood);
  return (
    <div>
      <HeaderWithSearchIcon title="Comidas" />
      { respostaFood && respostaFood.map((item) => item.idMeal)}
    </div>
  );
}

export default Foods;
