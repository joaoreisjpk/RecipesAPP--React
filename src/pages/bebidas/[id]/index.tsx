/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { drinkAPI } from '../../../services/getDrink';
import { foodAPI } from '../../../services/getFood';
import { DrinkObject, FoodObject } from '../../../interfaces';

import CardDetail from '../../../components/CardDetail';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

import styles from './main.module.scss';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

interface RecipeProps {
  itemDetail: DrinkObject;
  recomendationList: FoodObject[];
}

function DrinkRecipe({itemDetail, recomendationList}: RecipeProps) {
  const [isValidated, setIsValidated] = useState(false);
  
  useEffect(() => {
    const keyInProgressRecipesFromLS = () => {
      try {
        return JSON.parse(localStorage.getItem('inProgressRecipes') || '');
      } catch {
        return '';
      }
    };
      
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
    const drinkKeys = Object.keys(getStorage.cocktails);
    const validate = drinkKeys.some((id) => id === itemDetail.id);
    setIsValidated(validate);
  }, []);

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <section className={styles.recipeContainer}>
      <Header title='Bebidas' />
      <main>
        <CardDetail object={itemDetail} itemRecomendation={recomendationList} />
        <Link passHref href={`/bebidas/${itemDetail.id}/in-progress`}>
          <button data-testid='start-recipe-btn' type='button'>
            {isValidated ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default DrinkRecipe;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const itemDetail = await drinkAPI(`/lookup.php?i=${id}`);
  const recomendationList = await foodAPI('/search.php?s=');

  return {
    props: {
      itemDetail: itemDetail[0],
      recomendationList,
    },
  };
};
