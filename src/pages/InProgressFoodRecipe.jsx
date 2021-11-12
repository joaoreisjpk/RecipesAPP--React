/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients } from '../helpers';
import { getFoodById } from '../services/getFood';
import IngredientsInProgress from '../components/IngredientsInProgress';

function InProgressFoodRecipe() {
  const [foodRecipeInProgress, setFoodRecipeInProgress] = useState([]);
  const [disabled, setDisabled] = useState();
  const { strMealThumb, strMeal, strInstructions, strCategory } = foodRecipeInProgress;
  const { idMeal } = useParams();

  function isAllFoodIngredientsChecked() {
    console.log('rodou');
    const arrayOfIngredientsChecked = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ).meals[idMeal];
    const allIngredients = JSON.parse(localStorage.getItem('foodIngredients'));
    if (allIngredients.length === arrayOfIngredientsChecked.length) setDisabled(false);
    else setDisabled(true);
  }

  useEffect(async () => {
    const getFoodFromAPI = async () => {
      setFoodRecipeInProgress(await getFoodById(idMeal));
    };
    await getFoodFromAPI();
    isAllFoodIngredientsChecked();
  }, []);

  function renderPage() {
    return (
      <div>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h3 data-testid="recipe-title">{ strMeal }</h3>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <ButtonsFavoriteAndShare object={ { ...foodRecipeInProgress, type: 'comida' } } />
        <h3>Ingredientes</h3>
        { getIngredients(foodRecipeInProgress).map((ingrediente, index) => (
          <IngredientsInProgress
            key={ index }
            index={ index }
            ingrediente={ ingrediente }
            measures={ getMeasures(foodRecipeInProgress) }
            idMeal={ idMeal }
            handleButton={ isAllFoodIngredientsChecked }
          />
        ))}
        <section data-testid="instructions">{ strInstructions }</section>
        <Link to="/receitas-feitas">
          <button
            disabled={ disabled }
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
    foodRecipeInProgress && renderPage()
  );
}

export default InProgressFoodRecipe;
