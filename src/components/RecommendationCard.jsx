import React from 'react';
import PropTypes from 'prop-types';

const RecommendationCard = ({ recipe }) => (
  <section
    data-testid={ `${recipe.index}-recomendation-card` }
    className="recomendation-card"
  >
    <img
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt="food thumb"
      width="200px"
    />
    <h4>
      {recipe.strMeal || recipe.strDrink}
    </h4>
  </section>
);

RecommendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecommendationCard;
