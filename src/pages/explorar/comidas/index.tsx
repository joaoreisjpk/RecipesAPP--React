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
      <Header title='Explorar Comidas' />
      <main>
        <Link href='/explorar/comidas/ingredientes'>
          <a href='#'>
            <Button
              text='Explorar Por Ingredientes'
              dataID='explore-by-ingredient'
            />
          </a>
        </Link>
        <Link href='/explorar/comidas/area'>
          <a href='#'>
            <Button
              text='Explorar Por Local de Origem'
              dataID='explore-by-area'
            />
          </a>
        </Link>
        <Link href={`/comidas/${idMeal}`}>
          <a href='#'>
            <Button text='Me Surpreenda!' dataID='explore-surprise' />
          </a>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default ExploreFoods;
