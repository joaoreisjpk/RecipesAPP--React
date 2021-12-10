/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import RecommendationCard from './RecommendationCard';
import {
  getMeasures,
  getIngredients,
  getFavoriteList,
  setFavoriteList,
} from '../helpers';
import Video from './Video';
import ButtonsFavoriteAndShare from './ButtonsFavoriteAndShare';
import { DrinkObject, FoodObject } from '../interfaces';

interface CardDetailProps {
  itemRecomendation: FoodObject[] | DrinkObject[],
  object: DrinkObject | FoodObject,
}

const CardDetail = ({ itemRecomendation, object }: CardDetailProps): JSX.Element => {
  const [ingredients, setIngredients] = useState([] as string[]);
  const [measures, setMeasures] = useState([] as string[]);
  const [counter, setCounter] = useState(0);

  const { alcoholicOrNot, image, video, instruction, category, name } = object;

  const SIX = 6;

  const handleClick = (param: Boolean) => {
    if (param && (counter < 2 + 2 + 1)) {
      setCounter(counter + 1);
    } else setCounter(counter - 1);
  };

  useEffect(() => {
    setMeasures(getMeasures(object));
    setIngredients(getIngredients(object));

    if (!getFavoriteList()) {
      setFavoriteList([]);
    }
  }, []);

  if (!getFavoriteList()) return <div>Carregando...</div>;
  return (
    <section>
      <span  data-testid="recipe-title">
        {name}
        {' '}
        -
        {' '}
      </span>
      <span data-testid="recipe-category">
        {alcoholicOrNot || category}
      </span>
      <div>
        <img src={ image } alt={ name } data-testid="recipe-photo" />
        <ButtonsFavoriteAndShare
          object={ object }
        />
      </div>
      <h2>Instructions:</h2>

      <p data-testid="instructions">{instruction}</p>

      <h2>Ingredientes:</h2>
      { ingredients.map((ingrediente, index) => (
        <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`º ${ingrediente} - ${measures[index]}`}
        </div>
      ))}
      <div>
        { !video ? null : <Video srcVideo={ video } />}
      </div>
      <h2>Recomendations</h2>
      <button
        type="button"
        onClick={ () => handleClick(false) }
        disabled={ !counter }
      >
        {'<'}
      </button>
      <button
        type="button"
        onClick={ () => handleClick(true) }
        disabled={ counter === 2 + 2 + 1 }
      >
        {'>'}
      </button>
      { itemRecomendation.map((item, index) => (
        <RecommendationCard
          key={ index }
          recipe={ item }
          index={ index }
          counter={ counter }
        />
      )).slice(0, SIX) }
    </section>
  );
};

export default CardDetail;
