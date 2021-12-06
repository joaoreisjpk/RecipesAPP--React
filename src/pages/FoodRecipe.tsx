/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { foodAPI } from '../services/getFood';
import { drinkAPI } from '../services/getDrink';
import CardDetail from '../components/CardDetail';
import { DrinkObject, FoodObject } from '../interfaces';

function FoodRecipe() {
  const [itemDetail, setItemDetail] = useState<FoodObject>();
  const [itemRecomendation, setItemRecomendation] = useState([] as DrinkObject[]);
  const { idMeal } = useParams<{idMeal?: string}>();

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
      setItemDetail((await foodAPI(`/lookup.php?i=${idMeal}`))[0]);
      setItemRecomendation(await drinkAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  function handleButtonText() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes') || '');
    if (!getStorage && !getStorage.meals) return false;
    const mealKeys = Object.keys(getStorage.meals);
    const validate = mealKeys.some((id) => id === idMeal);
    return validate;
  }

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        itemRecomendation={ itemRecomendation }
      />
      <Link to={ `/comidas/${idMeal}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
        >
          {handleButtonText() ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );
}

export default FoodRecipe;
