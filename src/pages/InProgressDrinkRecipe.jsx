/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients } from '../helpers';
import { getDrinksID } from '../services/getDrink';
import IngredientsInProgress from '../components/IngredientsInProgress';

function InProgressDrinkRecipe() {
  const [drinkRecipeInProgress, setDrinkRecipeInProgress] = useState([]);
  const [disabled, setDisabled] = useState();
  const { strDrinkThumb, strDrink, strInstructions, strCategory } = drinkRecipeInProgress;
  const { idDrink } = useParams();

  const getInProgressRecipes = () => JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  const getCheckedIngredients = () => (JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  )).cocktails;

  async function saveDrinkIngredientsAtLocalStorage() {
    localStorage.setItem('drinkIngredients', JSON.stringify(
      getIngredients(await getDrinksID(idDrink)),
    ));
  }

  const setCheckedIngredients = () => localStorage.setItem('inProgressRecipes',
    JSON.stringify({ ...getInProgressRecipes(),
      cocktails: { ...getCheckedIngredients(), [idDrink]: [] } }));

  const isDisabled = () => {
    setDisabled(getIngredients(drinkRecipeInProgress)
      .length === getCheckedIngredients()[idDrink].length);
  };

  useEffect(() => {
    if (!getInProgressRecipes()) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const getDrinkFromAPI = async () => {
      saveDrinkIngredientsAtLocalStorage();
      setDrinkRecipeInProgress(await getDrinksID(idDrink));
    };
    if (!getCheckedIngredients()[idDrink]) setCheckedIngredients();
    getDrinkFromAPI();
  }, []);

  useEffect(() => {
    isDisabled();
  }, [drinkRecipeInProgress]);

  function renderPage() {
    return (
      <div>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h3 data-testid="recipe-title">{ strDrink }</h3>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <ButtonsFavoriteAndShare
          object={ { ...drinkRecipeInProgress, type: 'bebida' } }
        />
        <h3>Ingredientes</h3>
        { getIngredients(drinkRecipeInProgress).map((ingrediente, index) => (
          <IngredientsInProgress
            key={ index }
            index={ index }
            ingrediente={ ingrediente }
            measures={ getMeasures(drinkRecipeInProgress) }
            idDrink={ idDrink }
            handleButton={ () => isDisabled() }
          />
        ))}
        <section data-testid="instructions">{ strInstructions }</section>
        <Link to="/receitas-feitas">
          <button
            disabled={ !disabled }
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }

  return (
    drinkRecipeInProgress && renderPage()
  );
}

export default InProgressDrinkRecipe;
