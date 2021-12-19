import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { getRandomDrink } from '../../../services/getDrink';
import Button from '../../../components/Button';

import './main.scss';


function ExploreDrinks() {
  const [idDrink, setIdDrink] = useState<string>();
  useEffect(() => {
    const getIdFromRandomDrink = async () => {
      setIdDrink(await getRandomDrink());
    };
    getIdFromRandomDrink();
  }, []);

  return (
    <section className="exploreFDContainer">
      <Header title="Explorar Bebidas" />
      <main>
        <Link to="/explorar/bebidas/ingredientes">
          <Button text="Explorar Por Ingredientes" dataID="explore-by-ingredient" />
        </Link>
        <Link to={ `/bebidas/${idDrink}` }>
          <Button text="Me Surpreenda!" dataID="explore-surprise" />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
