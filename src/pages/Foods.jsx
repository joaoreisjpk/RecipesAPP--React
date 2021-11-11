/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import {
  getNome,
  getFoodCategory,
  getCategorylist,
  getIngrediente,
} from '../services/getFood';
import Footer from '../components/Footer';

function Foods() {
  const { respostaFood, setRespostaFood } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const DOZE = 12;
  const SIX = 6;

  useEffect(() => {
    const callAPI = async () => {
      if (ingredient) {
        setSelectCategory('Ingrediente');
        setRespostaFood(await getIngrediente(ingredient));
      } else setRespostaFood(await getNome(''));
    };
    const categoryAPI = async () => setCategories(await getCategorylist());

    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }) => {
    if (innerText === selectCategory || innerText === 'All') {
      setRespostaFood(await getNome(''));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaFood(await getFoodCategory(innerText));
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
      </button>)).splice(0, SIX);
  };

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
      { respostaFood && respostaFood.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link key={ index } to={ `/comidas/${idMeal}` }>
          <Cards
            key={ index }
            name={ strMeal }
            thumbnail={ strMealThumb }
            index={ index }
          />
        </Link>
      )).splice(0, DOZE)}
      <Footer />
    </div>
  );
}

export default Foods;
