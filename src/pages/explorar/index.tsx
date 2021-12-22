import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import styles from './main.module.scss';
import Link from 'next/link';

function Explore() {
  return (
    <section className={styles.exploreContainer}>
      <Header title="Explorar" />
      <main>
        <Link href="/explorar/comidas">
          <a href="#"><Button dataID="explore-food" text="Explorar Comidas" /></a>
        </Link>
        <Link href="/explorar/bebidas">
          <a href="#"><Button dataID="explore-drinks" text="Explorar Bebidas" /></a>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Explore;
