/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import { getDrinkNome, getDrinksCategory, getCategorylist } from '../services/getDrink';
import Footer from '../components/Footer';

function Drinks() {
  const { respostaDrink, setRespostaDrink } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const DOZE = 12;
  const SIX = 6;

  useEffect(() => {
    const callAPI = async () => {
      setRespostaDrink(await getDrinkNome(''));
    };
    const categoryAPI = async () => setCategories(await getCategorylist());
    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }) => {
    if (innerText === selectCategory || innerText === 'All') {
      setRespostaDrink(await getDrinkNome(''));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaDrink(await getDrinksCategory(innerText));
    }
  };

  const fetchCategories = () => {
    const allCategories = [{ strCategory: 'All' }, ...categories];
    return allCategories.map((item, index) => (
      <button
        key={ index }
        data-testid={ `${item.strCategory}-category-filter` }
        type="button"
        onClick={ handleClick }
      >
        {item.strCategory}
      </button>
    )).splice(0, SIX);
  };

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].idDrink}` } />;
  }
  if (respostaDrink === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <HeaderWithSearchIcon title="Bebidas" />
      { categories && fetchCategories() }
      { respostaDrink && respostaDrink.map(({ strDrink, strDrinkThumb }, index) => (
        <Cards
          key={ index }
          name={ strDrink }
          thumbnail={ strDrinkThumb }
          index={ index }
        />
      )).splice(0, DOZE)}
      <Footer />
    </div>
  );
}

export default Drinks;
