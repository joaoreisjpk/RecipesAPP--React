import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';

function Drinks() {
  const { respostaDrink } = useContext(MyContext);
  const TREZE = 12;

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].idDrink}` } />;
  }
  // console.log(respostaFood);
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
