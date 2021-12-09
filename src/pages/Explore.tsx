import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

import '../styles/explorePage.scss';

function Explore() {
  return (
    <section className="exploreContainer">
      <Header title="Explorar" />
      <main>
        <Link to="/explorar/comidas">
          <Button dataID="explore-food" text="Explorar Comidas" />
        </Link>
        <Link to="/explorar/bebidas">
          <Button dataID="explore-drinks" text="Explorar Bebidas" />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Explore;
