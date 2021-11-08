import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Drink Icon" />

      </button>
      <button type="button" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="Explore Icon" />

      </button>
      <button type="button" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}

export default Footer;
