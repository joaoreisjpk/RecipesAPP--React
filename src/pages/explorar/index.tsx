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
        <Link passHref href="/explorar/comidas">
          <Button dataID="explore-food" text="Explorar Comidas" />
        </Link>
        <Link passHref href="/explorar/bebidas">
          <Button dataID="explore-drinks" text="Explorar Bebidas" />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Explore;
