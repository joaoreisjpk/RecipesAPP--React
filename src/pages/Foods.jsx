/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import mealsByIngredient from '../helpers/mealsByIngredient';
import {
  foodAPI,
  getCategorylist,
  foodSmallAPi,
  // getIngrediente,
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
        // setRespostaFood(await getIngrediente(ingredient));
        setRespostaFood(mealsByIngredient);
      } else setRespostaFood(await foodAPI('/search.php?s='));
    };
    const categoryAPI = async () => setCategories(await getCategorylist());

    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }) => {
    if (innerText === selectCategory || innerText === 'All') {
      setRespostaFood(await foodAPI('/search.php?s='));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaFood(await foodSmallAPi(`/filter.php?c=${innerText}`));
    }
  };

  const fetchCategories = () => {
    const allCategories = [{ category: 'All' }, ...categories];
    return allCategories.map((item, index) => (
      <button
        key={ index }
        data-testid={ `${item.category}-category-filter` }
        type="button"
        onClick={ handleClick }
      >
        {item.category}
      </button>)).splice(0, SIX);
  };

  if (respostaFood && respostaFood.length === 1 && !selectCategory) {
    return <Redirect to={ `/comidas/${respostaFood[0].id}` } />;
  }

  if (respostaFood === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div className="main-page">
      <HeaderWithSearchIcon title="Foods" />
      { categories && fetchCategories() }
      <div id="card-container">
        { respostaFood && respostaFood.map(({ name, image, id }, index) => (
          <Link key={ index } to={ `/comidas/${id}` }>
            <Cards
              key={ index }
              name={ name }
              thumbnail={ image }
              index={ index }
            />
          </Link>
        )).splice(0, DOZE)}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
