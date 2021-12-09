import React from 'react';

interface CardsProps {
  thumbnail?: string,
  name?: string,
  index: number,
}

function Cards({ thumbnail, name, index }: CardsProps): JSX.Element {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumbnail }
        alt={ name }
        data-testid={
          `${index}-card-img`
        }
      />
      <p data-testid={ `${index}-card-name` }>
        { name }
      </p>
    </div>
  );
}

export default Cards;
