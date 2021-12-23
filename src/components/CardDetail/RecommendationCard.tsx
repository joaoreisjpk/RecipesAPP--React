import React from 'react';

import { FoodObject, DrinkObject } from '../../interfaces'

interface RecommendationCardProps {
  recipe: FoodObject | DrinkObject;
  index: number;
}

const RecommendationCard = ({ recipe, index }: RecommendationCardProps) => {
  const { image, name } = recipe;

  return (
    <section
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
