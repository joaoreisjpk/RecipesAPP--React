import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <Link to="/bebidas">
        <button type="button" data-testid="drinks-bottom-btn" src={ drinkIcon }>
          <img src={ drinkIcon } alt="Drink Icon" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" data-testid="explore-bottom-btn" src={ exploreIcon }>
          <img src={ exploreIcon } alt="Explore Icon" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" data-testid="food-bottom-btn" src={ mealIcon }>
          <img src={ mealIcon } alt="Meal Icon" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
