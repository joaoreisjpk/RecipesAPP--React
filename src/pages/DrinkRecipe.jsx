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
      const arrayValue = keyInProgressRecipesFromLS.cocktails[idDrink];
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...keyInProgressRecipesFromLS.meals,
        },
        cocktails: {
          ...keyInProgressRecipesFromLS.cocktails,
          [idDrink]: arrayValue ? [...keyInProgressRecipesFromLS.cocktails[idDrink]] : [],
        },
      }));
    };
    createIdKey();
  }, []);

  function saveDrinkIngredientsAtLocalStorage() {
    localStorage.setItem('drinkIngredients', JSON.stringify(getIngredients(itemDetail)));
  }
  /*
  function handleButtonText() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getStorage && !getStorage.cocktails) return false;
    const drinkKeys = Object.keys(getStorage.cocktails);
    const validate = drinkKeys.some((id) => id === idDrink);
    console.log('drinkKeys:', drinkKeys);
    console.log('validation:', validate);
    return validate;
  } */

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
          {/* {handleButtonText() ? 'Continuar Receita' : 'Iniciar Receita'} */}
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

export default DrinkRecipe;
