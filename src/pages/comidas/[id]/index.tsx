/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { foodAPI } from '../../../services/getFood';
import { drinkAPI } from '../../../services/getDrink';
import { DrinkObject, FoodObject } from '../../../interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import CardDetail from '../../../components/CardDetail';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

import styles from './main.module.scss';

interface RecipeProps {
  itemDetail: FoodObject;
  recomendationList: DrinkObject[];
}

function FoodRecipe({ itemDetail, recomendationList }: RecipeProps) {
  const [isValidated, setIsValidated] = useState(false);

  const keyInProgressRecipesFromLS = () => {
    try {
      return JSON.parse(localStorage.getItem('inProgressRecipes') || '');
    } catch {
      return '';
    }
  };

  useEffect(() => {
    if (!keyInProgressRecipesFromLS()) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          cocktails: {},
          meals: {},
        })
      );
    }
    const getStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes') || ''
    );
    const mealKeys = Object.keys(getStorage.meals);
    const validate = mealKeys.some((id) => id === itemDetail.id);
    return setIsValidated(validate);
  }, []);

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <section className={styles.recipeContainer}>
      <Header title='Comidas' />
      <main>
        <CardDetail object={itemDetail} itemRecomendation={recomendationList} />
        <Link passHref href={`/comidas/${itemDetail.id}/in-progress`}>
          <button data-testid='start-recipe-btn' type='button'>
            {isValidated ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default FoodRecipe;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const itemDetail = await foodAPI(`/lookup.php?i=${id}`);
  const recomendationList = await drinkAPI('/search.php?s=');

  return {
    props: {
      itemDetail: itemDetail[0],
      recomendationList,
    },
    redirect: 60 * 60 * 24 * 30, // 1 mês
  };
};
