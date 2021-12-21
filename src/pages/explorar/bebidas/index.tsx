import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { getRandomDrink } from '../../../services/getDrink';
import Button from '../../../components/Button';

import styles from './main.module.scss';
import Link from 'next/link';


function ExploreDrinks() {
  const [idDrink, setIdDrink] = useState<string>();
  useEffect(() => {
    const getIdFromRandomDrink = async () => {
      setIdDrink(await getRandomDrink());
    };
    getIdFromRandomDrink();
  }, []);

  return (
    <section className={styles.exploreFDContainer}>
      <Header title="Explorar Bebidas" />
      <main>
        <Link passHref href="/explorar/bebidas/ingredientes">
          <Button text="Explorar Por Ingredientes" dataID="explore-by-ingredient" />
        </Link>
        <Link passHref href={ `/bebidas/${idDrink}` }>
          <Button text="Me Surpreenda!" dataID="explore-surprise" />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
