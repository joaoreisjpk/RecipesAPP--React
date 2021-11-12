/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDrinksID } from '../services/getDrink';
import { getNome } from '../services/getFood';
import CardDetail from '../components/CardDetail';
import { getIngredients } from '../helpers';

function DrinkRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState();
  const { idDrink } = useParams();
  const keyInProgressRecipesFromLS = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const callAPI = async () => {
      setItemDetail(await getDrinksID(idDrink));
    };
    const callRecomendation = async () => setItemRecomendation(await getNome(''));
    callAPI();
    callRecomendation();
  }, []);

  useEffect(() => () => {
    const createIdKey = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgressRecipesFromLS.cocktails,
          [idDrink]: [...keyInProgressRecipesFromLS.cocktails[idDrink]],
        },
        meals: {
          ...keyInProgressRecipesFromLS.meals,
        },
      }));
    };
    createIdKey();
  }, []);

  function saveDrinkIngredientsAtLocalStorage() {
    localStorage.setItem('drinkIngredients', JSON.stringify(getIngredients(itemDetail)));
  }

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        srcImg={ itemDetail.strDrinkThumb }
        title={ itemDetail.strDrink }
        instructions={ itemDetail.strInstructions }
        category={ itemDetail.strCategory }
        alcoholicOrNot={ itemDetail.strAlcoholic }
        itemID={ idDrink }
        itemRecomendation={ itemRecomendation }
        type="bebida"
      />
      <Link to={ `/bebidas/${idDrink}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ saveDrinkIngredientsAtLocalStorage }
        >
          Iniciar Receita

        </button>
      </Link>
    </div>
  );
}

export default DrinkRecipe;
