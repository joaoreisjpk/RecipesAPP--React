import React from 'react';
import PropTypes from 'prop-types';

const RecommendationCard = ({ recipe, counter }) => {
  const handleVisibility = () => {
    if (counter === recipe.index || counter + 1 === recipe.index) return 'visible';
    return 'hidden';
  };

  return (
    <section
      style={ { visibility: handleVisibility() } }
      data-testid={ `${recipe.index}-recomendation-card` }
      className="recomendation-card"
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="food thumb"
        width="200px"
      />
      <h4 data-testid={ `${recipe.index}-recomendation-title` }>
        {recipe.strMeal || recipe.strDrink}
      </h4>
    </section>
  );
};

RecommendationCard.propTypes = {
  counter: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecommendationCard;
