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
        <Link href="/explorar/bebidas/ingredientes">
          <a href="#"><Button text="Explorar Por Ingredientes" dataID="explore-by-ingredient" /></a>
        </Link>
        <Link href={ `/bebidas/${idDrink}` }>
          <a href="#"><Button text="Me Surpreenda!" dataID="explore-surprise" /></a>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
