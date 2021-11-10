import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomDrink } from '../services/getDrink';
import Button from '../components/Button';

function ExploreDrinks() {
  const [idDrink, setIdDrink] = useState('');
  useEffect(() => {
    const getIdFromRandomDrink = async () => {
      setIdDrink(await getRandomDrink());
    };
    getIdFromRandomDrink();
  }, []);

  return (
    <>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <Button text="Explorar Por Ingredientes" dataID="explore-by-ingredient" />
      </Link>
      <Link to={ `/bebidas/${idDrink}` }>
        <Button text="Me Surpreenda!" dataID="explore-surprise" />
      </Link>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
