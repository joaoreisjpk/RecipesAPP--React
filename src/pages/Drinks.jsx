import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';

function Drinks() {
  const { respostaDrink } = useContext(MyContext);

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].idDrink}` } />;
  }
  // console.log(respostaFood);
  return (
    <div>
      <HeaderWithSearchIcon title="Comidas" />
      { respostaDrink && respostaDrink.map((item) => <Cards )}
    </div>
  );
}

export default Drinks;
