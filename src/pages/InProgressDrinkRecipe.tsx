/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients } from '../helpers';
import { drinkAPI } from '../services/getDrink';
import IngredientsInProgress from '../components/IngredientsInProgress';
import { DrinkObject } from '../interfaces';

function InProgressDrinkRecipe() {
  const [drinkRecipeInProgress, setDrinkRecipeInProgress] = useState({} as DrinkObject);
  const [disabled, setDisabled] = useState<Boolean>();
  const { image, name, instruction, category, type } = drinkRecipeInProgress;
  const { idDrink } = useParams<{idDrink?: string | any}>();

  const getInProgressRecipes = () => JSON
    .parse(localStorage.getItem('inProgressRecipes') || '{}');

  const getCheckedIngredients = () => (JSON.parse(
    localStorage.getItem('inProgressRecipes') || '{}',
  )).cocktails;

  async function saveDrinkIngredientsAtLocalStorage() {
    localStorage.setItem('drinkIngredients', JSON.stringify(
      getIngredients((await drinkAPI(`/lookup.php?i=${idDrink}`))[0]),
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
      setDrinkRecipeInProgress((await drinkAPI(`/lookup.php?i=${idDrink}`))[0]);
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
        <img data-testid="recipe-photo" src={ image } alt={ name } />
        <h3 data-testid="recipe-title">{ name }</h3>
        <h3 data-testid="recipe-category">{ category }</h3>
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
            id={ idDrink }
            type={ type }
            handleButton={ () => isDisabled() }
          />
        ))}
        <section data-testid="instructions">{ instruction }</section>
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
