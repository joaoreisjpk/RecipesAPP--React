/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodById } from '../services/getFood';
import { getDrinkNome } from '../services/getDrink';
import CardDetail from '../components/CardDetail';

function FoodRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState();
  const { idMeal } = useParams();

  const keyInProgressRecipesFromLS = () => JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (!keyInProgressRecipesFromLS()) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const callAPI = async () => {
      setItemDetail(await getFoodById(idMeal));
    };
    const callRecomendation = async () => setItemRecomendation(await getDrinkNome(''));
    callAPI();
    callRecomendation();
  }, []);

  function handleButtonText() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
        >
          {handleButtonText() ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );
}

export default FoodRecipe;
