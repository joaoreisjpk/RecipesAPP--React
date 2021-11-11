/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients } from '../helpers';
import { getDrinksID } from '../services/getDrink';
import IngredientsInProgress from '../components/IngredientsInProgress';

function InProgressDrinkRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [drinkRecipeInProgress, setDrinkRecipeInProgress] = useState([]);
  const { strDrinkThumb, strDrink, strInstructions, strCategory } = drinkRecipeInProgress;
  const { idDrink } = useParams();

  useEffect(() => {
    const getDrinkFromAPI = async () => {
      setDrinkRecipeInProgress(await getDrinksID(idDrink));
    };
    getDrinkFromAPI();
  }, []);

  useEffect(() => {
    setMeasures(getMeasures(drinkRecipeInProgress));
    setIngredients(getIngredients(drinkRecipeInProgress));
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
        { ingredients.map((ingrediente, index) => (
          <IngredientsInProgress
            key={ index }
            index={ index }
            ingrediente={ ingrediente }
            measures={ measures }
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
    drinkRecipeInProgress && renderPage()
  );
}

export default InProgressDrinkRecipe;
