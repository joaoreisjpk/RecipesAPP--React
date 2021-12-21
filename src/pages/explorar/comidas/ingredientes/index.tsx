import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../../../../context/MyContext';
import { api, getIngredientList } from '../../../../services/getFood';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import styles from './main.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface ingredientsProps {
  strIngredient: string
}

function ExploreFoodsIngredients({ingredients} : { ingredients: ingredientsProps[]}) {
  const { setIngredient, setRespostaFood } = useContext(MyContext);
  const TRINTA = 30;

  useEffect(() => {
    return () => setRespostaFood([]);
  }, []);

  const handleIngredient = (param: string) => {
    setIngredient(param);
  };

  return (
    <section className={styles.exploreIngContainer}>
      <Header title="Explorar Ingredientes" />
      <main>
        { ingredients.splice(0, TRINTA).map(({ strIngredient }, index) => (
          <Link passHref href="/comidas/" key={ index }>
            <button type="button" onClick={ () => handleIngredient(strIngredient) }>
              <div data-testid={ `${index}-ingredient-card` }>
                <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </button>
          </Link>
        ))}
      </main>
      <Footer />
    </section>
  );
}

export default ExploreFoodsIngredients;


export const getStaticProps: GetStaticProps = async () => {
  const getIngredientList = async () => {
    const response = await api.get('/list.php?i=list');
    return response.data.meals;
  };

  return {
    props: {
      ingredients: await getIngredientList(),
    },
    redirect: 60 * 60 * 24 * 30, // 1 mês
  };
};
