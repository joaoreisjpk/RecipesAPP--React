import React, { useEffect, useContext } from 'react';
import MyContext from '../../../../context/MyContext';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { api } from '../../../../services/getDrink';

import styles from './main.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export default function ExploreDrinksIngredients({ ingredientsAPI }) {
  const { setIngredient, setRespostaDrink } = useContext(MyContext);
  const TRINTA = 30;

  useEffect(() => {
    return () => setRespostaDrink([]);
  }, []);

  const handleIngredient = (param: string) => {
    setIngredient(param);
  };

  return (
    <section className={styles.exploreIngContainer}>
      <Header title='Explorar Ingredientes' />
      <main>
        {ingredientsAPI &&
          ingredientsAPI.splice(0, TRINTA).map(({ strIngredient1 }, index) => (
            <Link passHref href='/bebidas/' key={strIngredient1}>
              <button
                type='button'
                onClick={() => handleIngredient(strIngredient1)}
              >
                <div data-testid={`${index}-ingredient-card`}>
                  <h3 data-testid={`${index}-card-name`}>{strIngredient1}</h3>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`}
                    alt=''
                    data-testid={`${index}-card-img`}
                  />
                </div>
              </button>
            </Link>
          ))}
      </main>
      <div>a</div>
      <Footer />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getIngredientList = async () => {
    const response = await api.get('/list.php?i=list');
    return response.data.drinks;
  };

  return {
    props: {
      ingredientsAPI: await getIngredientList(),
    },
    redirect: 60 * 30, // 30 minutos
  };
};
