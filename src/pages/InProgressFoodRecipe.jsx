/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../components/ButtonsFavoriteAndShare';
import {
  getMeasures,
  getIngredients,
  getFavoriteList,
  setFavoriteList } from '../helpers';
import { getFoodById } from '../services/getFood';
import IngredientsInProgress from '../components/IngredientsInProgress';

function InProgressFoodRecipe() {
  const [foodRecipeInProgress, setFoodRecipeInProgress] = useState([]);
  const { strMealThumb, strMeal, strInstructions, strCategory } = foodRecipeInProgress;
  const { idMeal } = useParams();

  useEffect(() => {
    const getFoodFromAPI = async () => {
      setFoodRecipeInProgress(await getFoodById(idMeal));
    };

    getFoodFromAPI();
    if (!getFavoriteList()) {
      setFavoriteList([]);
    }
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
          />
        ))}
        <section data-testid="instructions">{ strInstructions }</section>
        <Link to="/receitas-feitas">
          <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
        </Link>
      </div>
    );
  }

  return (
    foodRecipeInProgress && renderPage()
  );
}

export default InProgressFoodRecipe;
