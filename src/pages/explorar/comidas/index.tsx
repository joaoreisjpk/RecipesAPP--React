import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { getRandomFood } from '../../../services/getFood';
import Button from '../../../components/Button';

import styles from './main.module.scss';
import Link from 'next/link';

function ExploreFoods() {
  const [idMeal, setIdMeal] = useState<string>();
  useEffect(() => {
    const getIdFromRandomFood = async () => {
      setIdMeal(await getRandomFood());
    };
    getIdFromRandomFood();
  }, []);

  return (
    <section className={styles.exploreFDContainer}>
      <Header title="Explorar Comidas" />
      <main>
        <Link passHref href="/explorar/comidas/ingredientes">
          <Button text="Explorar Por Ingredientes" dataID="explore-by-ingredient" />
        </Link>
        <Link passHref href="/explorar/comidas/area">
          <Button text="Explorar Por Local de Origem" dataID="explore-by-area" />
        </Link>
        <Link passHref href={ `/comidas/${idMeal}` }>
          <Button text="Me Surpreenda!" dataID="explore-surprise" />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default ExploreFoods;
