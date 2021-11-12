/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodById } from '../services/getFood';
import { getDrinkNome } from '../services/getDrink';
import CardDetail from '../components/CardDetail';
import { getIngredients } from '../helpers';

function FoodRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState();
  const { idMeal } = useParams();
  const keyInProgressRecipesFromLS = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const callAPI = async () => {
      setItemDetail(await getFoodById(idMeal));
    };
    const callRecomendation = async () => setItemRecomendation(await getDrinkNome(''));
    callAPI();
    callRecomendation();
  }, []);

  useEffect(() => () => {
    const createIdKey = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgressRecipesFromLS.cocktails,
        },
        meals: {
          ...keyInProgressRecipesFromLS.meals,
          [idMeal]: [...keyInProgressRecipesFromLS.meals[idMeal]],
        },
      }));
    };
    createIdKey();
  }, []);

  function saveFoodIngredientsAtLocalStorage() {
    localStorage.setItem('foodIngredients', JSON.stringify(getIngredients(itemDetail)));
  }

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        srcImg={ itemDetail.strMealThumb }
        title={ itemDetail.strMeal }
        category={ itemDetail.strCategory }
        instructions={ itemDetail.strInstructions }
        srcVideo={ itemDetail.strYoutube }
        itemRecomendation={ itemRecomendation }
        itemID={ idMeal }
        type="comida"
      />
      <Link to={ `/comidas/${idMeal}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ saveFoodIngredientsAtLocalStorage }
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

export default FoodRecipe;
