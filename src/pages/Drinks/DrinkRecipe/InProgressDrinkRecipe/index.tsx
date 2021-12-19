/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../../../../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients, handleDone } from '../../../../helpers';
import { drinkAPI } from '../../../../services/getDrink';
import IngredientsInProgress from '../../../../components/IngredientsInProgress';
import { DrinkObject } from '../../../../interfaces';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import './main.scss';

function InProgressDrinkRecipe() {
  const [drinkRecipeInProgress, setDrinkRecipeInProgress] = useState(
    {} as DrinkObject
  );
  const [disabled, setDisabled] = useState<Boolean>();
  const { image, name, instruction, category, type } = drinkRecipeInProgress;
  const { idDrink } = useParams<{ idDrink?: string | any }>();
  const { push } = useHistory();

  const getInProgressRecipes = () =>
    JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

  const getCheckedIngredients = () =>
    JSON.parse(localStorage.getItem('inProgressRecipes') || '{}').cocktails;

  async function saveDrinkIngredientsAtLocalStorage() {
    localStorage.setItem(
      'drinkIngredients',
      JSON.stringify(
        getIngredients((await drinkAPI(`/lookup.php?i=${idDrink}`))[0])
      )
    );
  }

  const setCheckedIngredients = () =>
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...getInProgressRecipes(),
        cocktails: { ...getCheckedIngredients(), [idDrink]: [] },
      })
    );

  const isDisabled = () => {
    setDisabled(
      getIngredients(drinkRecipeInProgress).length ===
        getCheckedIngredients()[idDrink].length
    );
  };

  function handleClick() {
    handleDone(drinkRecipeInProgress);
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
      <section className='inProgressContainer'>
        <Header title='Bebidas' />
        <main>
          <section>
            <span data-testid='recipe-title'>{name} - </span>
            <span data-testid='recipe-category'>{category}</span>
            <div>
              <img data-testid='recipe-photo' src={image} alt={name} />
              <ButtonsFavoriteAndShare
                object={{ ...drinkRecipeInProgress, type: 'bebida' }}
              />
            </div>
          </section>
          <h2>Instruções:</h2>
          <p data-testid='instructions'>{instruction}</p>
          <h2>Ingredientes: </h2>
          <div>
            {getIngredients(drinkRecipeInProgress).map((ingrediente, index) => (
              <IngredientsInProgress
                key={index}
                index={index}
                ingrediente={ingrediente}
                measures={getMeasures(drinkRecipeInProgress)}
                id={idDrink}
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
        </main>
        <Footer />
      </section>
    );
  }

  return drinkRecipeInProgress && renderPage();
}

export default InProgressDrinkRecipe;
