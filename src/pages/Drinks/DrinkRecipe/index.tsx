/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { drinkAPI } from '../../../services/getDrink';
import { foodAPI } from '../../../services/getFood';
import { DrinkObject, FoodObject } from '../../../interfaces';

import CardDetail from '../../../components/CardDetail';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

import './main.scss';

function DrinkRecipe() {
  const [itemDetail, setItemDetail] = useState<DrinkObject>();
  const [itemRecomendation, setItemRecomendation] = useState([] as FoodObject[]);
  const { idDrink } = useParams<{idDrink?: string}>();

  const keyInProgressRecipesFromLS = () => JSON
    .parse(localStorage.getItem('inProgressRecipes') || '');

  useEffect(() => {
    if (!keyInProgressRecipesFromLS()) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const callAPI = async () => {
      setItemDetail((await drinkAPI(`/lookup.php?i=${idDrink}`))[0]);
      setItemRecomendation(await foodAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  function handleButtonText() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes') || '');
    if (!getStorage && !getStorage.cocktails) return false;
    const drinkKeys = Object.keys(getStorage.cocktails);
    const validate = drinkKeys.some((id) => id === idDrink);
    return validate;
  }

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <section className="recipeContainer">
      <Header title="Bebidas" />
      <main>
        <CardDetail
          object={ itemDetail }
          itemRecomendation={ itemRecomendation }
        />
        <Link to={ `/bebidas/${idDrink}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            {handleButtonText() ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default DrinkRecipe;
