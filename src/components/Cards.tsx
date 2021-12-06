import React from 'react';

interface CardsProps {
  thumbnail?: string,
  name?: string,
  index: number,
}

function Cards({ thumbnail, name, index }: CardsProps): JSX.Element {
  return (
    <div data-testid={ `${index}-recipe-card` } id="card-div">
      <img
        id="card-img"
        src={ thumbnail }
        alt={ name }
        data-testid={
          `${index}-card-img`
        }
      />
      <h3
        data-testid={ `${index}-card-name` }
        id="card-name"
      >
        { name }
      </h3>
    </div>
  );
}

export default Cards;
