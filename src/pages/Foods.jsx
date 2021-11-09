/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import { getNome, getFoodCategory, getCategorylist } from '../services/getFood';

function Foods() {
  const { respostaFood, setRespostaFood } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const DOZE = 12;
  const FIVE = 5;

  useEffect(() => {
    const callAPI = async () => setRespostaFood(await getNome(''));
    const categoryAPI = async () => setCategories(await getCategorylist());

    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }) => {
    if (innerText === selectCategory) {
      setRespostaFood(await getNome(''));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaFood(await getFoodCategory(innerText));
    }
  };

  const fetchCategories = () => (
    categories.map((item, index) => (
      <button
        key={ index }
        data-testid={ `${item.strCategory}-category-filter` }
        type="button"
        onClick={ handleClick }
      >
        {item.strCategory}
      </button>)).splice(0, FIVE)
  );

  if (respostaFood && respostaFood.length === 1 && !selectCategory) {
    return <Redirect to={ `/comidas/${respostaFood[0].idMeal}` } />;
  }
  if (respostaFood === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <HeaderWithSearchIcon title="Comidas" />
      { categories && fetchCategories() }
      { respostaFood && respostaFood.map(({ strMeal, strMealThumb }, index) => (
        <Cards
          key={ index }
          name={ strMeal }
          thumbnail={ strMealThumb }
          index={ index }
        />
      )).splice(0, DOZE)}
    </div>
  );
}

export default Foods;
