import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/footer.scss';

function Footer(): JSX.Element {
  return (
    <footer data-testid="footer">
      <section id="container">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          id="drinks-bottom-btn"
        >
          <Link to="/bebidas">
            <img src={ drinkIcon } alt="Drink Icon" />
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          id="explore-bottom-btn"
        >
          <Link to="/explorar">
            <img src={ exploreIcon } alt="Explore Icon" />
          </Link>
        </button>
        <button
          type="button"
          data-testid="food-bottom-btn"
          id="food-bottom-btn"
        >
          <Link to="/comidas">
            <img src={ mealIcon } alt="Meal Icon" />
          </Link>
        </button>
      </section>
    </footer>
  );
}

export default Footer;
