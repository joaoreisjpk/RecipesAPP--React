import React from 'react';

import styles from './main.module.scss'

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
      <div className={styles.titleDiv}>
        <p data-testid={ `${index}-card-name` }>
          { name }
        </p>
      </div>
    </div>
  );
}

export default Cards;
