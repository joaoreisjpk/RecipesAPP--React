import React from 'react';
import PropTypes from 'prop-types';

const RecommendationCard = ({ recipe, counter }) => {
  const { image, index, name } = recipe;

  const handleVisibility = () => {
    if (counter === index || counter + 1 === index) return 'visible';
    return 'hidden';
  };

  return (
    <section
      style={ { visibility: handleVisibility() } }
      data-testid={ `${index}-recomendation-card` }
      className="recomendation-card"
    >
      <img
        src={ image }
        alt="food thumb"
        width="200px"
      />
      <h4 data-testid={ `${index}-recomendation-title` }>
        {name}
      </h4>
    </section>
  );
};

RecommendationCard.propTypes = {
  counter: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecommendationCard;
