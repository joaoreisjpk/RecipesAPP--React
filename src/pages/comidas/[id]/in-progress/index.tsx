/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ButtonsFavoriteAndShare from '../../../../components/ButtonsFavoriteAndShare';
import { getMeasures, getIngredients, handleDone } from '../../../../helpers';
import IngredientsInProgress from '../../../../components/IngredientsInProgress';
import { FoodObject } from '../../../../interfaces';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import styles from './main.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { foodAPI } from '../../../../services/getFood';

interface InProgressProps {
  ingredients: string[];
  itemDetails: FoodObject;
}

export default function Main({ ingredients, itemDetails }: InProgressProps) {
  const { image, name, instruction, category, type, id } = itemDetails;
  const [disabled, setDisabled] = useState<Boolean>();
  const { push } = useRouter();
  const defaultValue = {
    cocktails: {},
    meals: {[id]: []},
  };
  const [storagedRecipe, setStoragedRecipe] = useState(defaultValue.meals);

  const setCheckedIngredients = (storage) =>
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...storage,
        meals: { ...storage.meals, [id]: [] },
      })
    );

  useEffect(() => {
    let storage;

    try {
      storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setStoragedRecipe(storage.meals);

      if (!storage.meals[id]) {
        setCheckedIngredients(storage);
      }
    } catch {
      localStorage.setItem('inProgressRecipes', JSON.stringify(defaultValue));
    }

    localStorage.setItem('drinkIngredients', JSON.stringify(ingredients));
  }, []);

  const isDisabled = () => {
    let storage;

    try {
      storage = JSON.parse(localStorage.getItem('inProgressRecipes'));   
      setDisabled(ingredients.length === storage.meals[id]?.length);
    } catch {
      localStorage.setItem('inProgressRecipes', JSON.stringify(defaultValue));
      setDisabled(false);
    }
  };

  function handleClick() {
    handleDone(itemDetails);
    push('/receitas-feitas');
  }

  useEffect(() => {
    isDisabled();
  }, [itemDetails]);

  return (
    <section className={styles.inProgressContainer}>
      <Header title='Comidas' />
      <main>
        <div>
          <span data-testid='recipe-title'>{name} - </span>
          <span data-testid='recipe-category'>{category}</span>
          <div>
            <img data-testid='recipe-photo' src={image} alt={name} />
            <ButtonsFavoriteAndShare
              object={{ ...itemDetails }}
            />
          </div>
        </div>
        <div>
          <h2>Instru????es:</h2>
          <p data-testid='instructions'>{instruction}</p>
        </div>
        <div>
          <h2>Ingredientes: </h2>
          <div className='ingredientsList'>
            {ingredients.map((ingrediente, index) => (
              <IngredientsInProgress
                key={index}
                index={index}
                ingrediente={ingrediente}
                measures={getMeasures(itemDetails)}
                id={id}
                type={type}
                handleButton={() => isDisabled()}
              />
            ))}
          </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const fetchIngredients = await foodAPI(`/lookup.php?i=${id}`);
  const ingredients = getIngredients(fetchIngredients[0]);

  return {
    props: {
      ingredients,
      itemDetails: fetchIngredients[0],
    },
    redirect: 60 * 60 * 24 * 30, // 1 m??s
  };
};
