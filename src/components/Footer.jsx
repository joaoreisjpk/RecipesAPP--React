import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <section id="container">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          id="drinks-bottom-btn"
          src={ drinkIcon }
        >
          <Link to="/bebidas">
            <img src={ drinkIcon } alt="Drink Icon" />
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          id="explore-bottom-btn"
          src={ exploreIcon }
        >
          <Link to="/explorar">
            <img src={ exploreIcon } alt="Explore Icon" />
          </Link>
        </button>
        <button
          type="button"
          data-testid="food-bottom-btn"
          id="food-bottom-btn"
          src={ mealIcon }
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
