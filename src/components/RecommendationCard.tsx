import React from 'react';

import { FoodObject, DrinkObject } from '../interfaces'

interface RecommendationCardProps {
  recipe: FoodObject | DrinkObject;
  counter: number;
  index: number;
}

const RecommendationCard = ({ recipe, index, counter }: RecommendationCardProps) => {
  const { image, name } = recipe;

  const handleVisibility = () => {
    if (counter === index || counter + 1 === index) return 'block';
    return 'none';
  };

  return (
    <section
      style={ { display: handleVisibility() } }
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

export default RecommendationCard;
