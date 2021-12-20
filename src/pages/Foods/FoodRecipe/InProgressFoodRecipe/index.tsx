/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getMeasures, getIngredients, handleDone } from '../../../../helpers';
import { foodAPI } from '../../../../services/getFood';
import { FoodObject } from '../../../../interfaces';

import ButtonsFavoriteAndShare from '../../../../components/ButtonsFavoriteAndShare';
import IngredientsInProgress from '../../../../components/IngredientsInProgress';

import './main.scss';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

function InProgressFoodRecipe() {
  const [foodRecipeInProgress, setFoodRecipeInProgress] = useState(
    {} as FoodObject
  );
  const [disabled, setDisabled] = useState<Boolean>();
  const { image, name, instruction, category, type } =
    foodRecipeInProgress;
  const { idMeal } = useParams<{ idMeal: string }>();
  const { push } = useHistory();

  const getInProgressRecipes = () =>
    JSON.parse(localStorage.getItem('inProgressRecipes') || '');

  const getCheckedIngredients = () =>
    JSON.parse(localStorage.getItem('inProgressRecipes') || '').meals;

  const setCheckedIngredients = () =>
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...getInProgressRecipes(),
        meals: { ...getCheckedIngredients(), [idMeal]: [] },
      })
    );

  const isDisabled = () =>
    setDisabled(
      getIngredients(foodRecipeInProgress).length ===
        getCheckedIngredients()[idMeal].length
    );

  function handleClick() {
    handleDone(foodRecipeInProgress);
    push('/receitas-feitas');
  }

  useEffect(() => {
    if (!getInProgressRecipes()) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          cocktails: {},
          meals: {},
        })
      );
    }

    if (!getCheckedIngredients()[idMeal]) setCheckedIngredients();

    const getFoodFromAPI = async () => {
      setFoodRecipeInProgress((await foodAPI(`/lookup.php?i=${idMeal}`))[0]);
    };
    getFoodFromAPI();
  }, []);

  useEffect(() => {
    isDisabled();
  }, [foodRecipeInProgress]);

  function renderPage() {
    return (
      <section className='inProgressContainer'>
        <Header title='Comidas' />
        <main>
          <div>
            <span data-testid='recipe-title'>{name} - </span>
            <span data-testid='recipe-category'>{category}</span>
            <div>
              <img data-testid='recipe-photo' src={image} alt={name} />
              <ButtonsFavoriteAndShare
                object={{ ...foodRecipeInProgress, type: 'comida' }}
              />
            </div>
          </div>
          <div>
            <h2>Instruções: </h2>
            <p data-testid='instructions'>{instruction}</p>
          </div>
          <div>
            <h2>Ingredientes: </h2>
            <div className='ingredientsList'>
              {getIngredients(foodRecipeInProgress).map((ingrediente, index) => (
                <IngredientsInProgress
                  key={index}
                  index={index}
                  ingrediente={ingrediente}
                  measures={getMeasures(foodRecipeInProgress)}
                  id={idMeal}
                  type={type}
                  handleButton={() => isDisabled()}
                />
              ))}
            </div>
            <button
              disabled={!disabled}
              data-testid='finish-recipe-btn'
              type='button'
              onClick={handleClick}
            >
              Finalizar Receita
            </button>
          </div>
        </main>
        <Footer />
      </section>
    );
  }

  return foodRecipeInProgress && renderPage();
}

export default InProgressFoodRecipe;
