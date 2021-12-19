/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getMeasures, getIngredients } from '../../../../helpers';
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
  const { image, name, instruction, category, type } = foodRecipeInProgress;
  const { idMeal } = useParams<{ idMeal: string }>();

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
          <section>
            <span data-testid='recipe-title'>{name} - </span>
            <span data-testid='recipe-category'>{category}</span>
            <div>
              <img data-testid='recipe-photo' src={image} alt={name} />
              <ButtonsFavoriteAndShare
                object={{ ...foodRecipeInProgress, type: 'comida' }}
              />
            </div>
          </section>
          <h2>Instruções: </h2>
          <p data-testid='instructions'>{instruction}</p>
          <h2>Ingredientes: </h2>
          <div>
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
          <Link to='/receitas-feitas'>
            <button
              disabled={!disabled}
              data-testid='finish-recipe-btn'
              type='button'
            >
              Finalizar Receita
            </button>
          </Link>
        </main>
        <Footer />
      </section>
    );
  }

  return foodRecipeInProgress && renderPage();
}

export default InProgressFoodRecipe;
