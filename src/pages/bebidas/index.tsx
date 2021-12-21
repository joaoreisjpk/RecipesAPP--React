/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import HeaderWithSearchIcon from '../../components/HeaderWithSearchIcon';
import MyContext from '../../context/MyContext';
import Cards from '../../components/Cards';
import { drinkAPI, drinkSmallAPI } from '../../services/getDrink';

import Footer from '../../components/Footer';

import styles from './main.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Drinks() {
  const { respostaDrink, setRespostaDrink } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const { push } = useRouter();
  const TRINTA = 30;

  useEffect(() => {
    const callAPI = async () => {
      if (ingredient) {
        setRespostaDrink(await drinkSmallAPI(`/filter.php?i=${ingredient}`));
      } else setRespostaDrink(await drinkAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  if (respostaDrink && respostaDrink.length === 1) {
    return push(`/comidas/${respostaDrink[0].id}`)
  }

  return (
    <div className={styles.foodDrinksContainer}>
      <HeaderWithSearchIcon
        title='Bebidas'
      />
      <main>
        {respostaDrink
          .map(({ name, image, id }, index) => (
            <Link key={id} passHref href={`/bebidas/${id}`}>
              <Cards name={name} thumbnail={image} index={index} />
            </Link>
          ))
          .splice(0, TRINTA)}
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
