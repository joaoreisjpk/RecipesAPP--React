/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecommendationCard from './RecommendationCard';
import {
  getMeasures,
  getIngredients,
  getFavoriteList,
  setFavoriteList,
} from '../helpers';
import Video from './Video';
import Buttons from './Buttons';

const CardDetail = ({
  srcImg,
  title,
  category,
  instructions,
  srcVideo,
  itemRecomendation,
  object,
  type,
  alcoholicOrNot = '' }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [counter, setCounter] = useState(0);

  const SIX = 6;

  const handleClick = (param) => {
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
    <div>
      <span style={ { fontSize: '40px' } } data-testid="recipe-title">
        {title}
        {' '}
        -
        {' '}
      </span>
      <span style={ { fontSize: '40px' } } data-testid="recipe-category">
        {alcoholicOrNot || category}
      </span>
      <div>
        <img src={ srcImg } alt={ title } data-testid="recipe-photo" />
      </div>
      <p data-testid="instructions">{instructions}</p>

      <Buttons
        object={ { ...object, type } }
      />

      <h3>Ingredientes</h3>
      { ingredients.map((ingrediente, index) => (
        <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`Ingrediente: ${ingrediente} - Medida: ${measures[index]}`}
        </div>
      ))}
      <div>
        { !srcVideo ? null : <Video srcVideo={ srcVideo } />}
      </div>
      <h3>Recomendações</h3>
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
      { itemRecomendation && itemRecomendation.map((item, index) => (
        <RecommendationCard
          key={ index }
          recipe={ { ...item, index } }
          counter={ counter }
        />
      )).slice(0, SIX) }
    </div>
  );
};

CardDetail.propTypes = {
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  itemRecomendation: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  object: PropTypes.objectOf(PropTypes.any).isRequired,
  srcImg: PropTypes.string.isRequired,
  srcVideo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardDetail;
