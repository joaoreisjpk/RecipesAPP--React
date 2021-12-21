/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import HeaderWithSearchIcon from '../../components/HeaderWithSearchIcon';
import MyContext from '../../context/MyContext';
import Cards from '../../components/Cards';
import { foodAPI, foodSmallAPi } from '../../services/getFood';
import Footer from '../../components/Footer';

import styles from './main.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Foods() {
  const { respostaFood, setRespostaFood } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const { push } = useRouter();
  const TRINTA = 30;

  useEffect(() => {
    const callAPI = async () => {
      if (ingredient) {
        setRespostaFood(await foodSmallAPi(`/filter.php?i=${ingredient}`));
      } else setRespostaFood(await foodAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  if (respostaFood && respostaFood.length === 1) {
    return push(`/comidas/${respostaFood[0].id}`);
  }

  return (
    <div className={styles.foodDrinksContainer}>
      <HeaderWithSearchIcon
        title='Foods'
      />
      <main>
        {respostaFood
          .map(({ name, image, id }, index) => (
            <Link key={id} href={`/comidas/${id}`} passHref>
              <a href="">
                <Cards name={name} thumbnail={image} index={index} />
              </a>
            </Link>
          ))
          .splice(0, TRINTA)}
      </main>
      <Footer />
    </div>
  );
}

export default Foods;
