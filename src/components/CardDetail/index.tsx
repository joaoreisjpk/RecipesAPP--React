/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import RecommendationCard from './RecommendationCard';
import {
  getMeasures,
  getIngredients,
  getFavoriteList,
  setFavoriteList,
} from '../../helpers';
import Video from './Video';
import ButtonsFavoriteAndShare from '../ButtonsFavoriteAndShare';
import { DrinkObject, FoodObject } from '../../interfaces';

import styles from './main.module.scss';
import Image from 'next/image';
import { Main } from '../Swiper';

interface CardDetailProps {
  itemRecomendation: FoodObject[] | DrinkObject[];
  object: DrinkObject | FoodObject;
}

const CardDetail = ({
  itemRecomendation,
  object,
}: CardDetailProps): JSX.Element => {
  const [ingredients, setIngredients] = useState([] as string[]);
  const [measures, setMeasures] = useState([] as string[]);
  const [counter, setCounter] = useState(0);

  const { alcoholicOrNot, image, video, instruction, category, name } = object;

  const SIX = 6;

  const handleClick = (param: Boolean) => {
    if (param && counter < 2 + 2 + 1) {
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

  return (
    <section className={styles.cardDetailContainer}>
      <div>
        <span data-testid='recipe-title'>{name} - </span>
        <span data-testid='recipe-category'>{alcoholicOrNot || category}</span>
        <div>
          <Image width={400} height={400} src={image} alt={name} data-testid='recipe-photo' />
          <ButtonsFavoriteAndShare object={object} />
        </div>
      </div>
      <div>
        <h2>Instructions:</h2>
        <p data-testid='instructions'>{instruction}</p>
      </div>

      <div>
        <h2>Ingredientes:</h2>
        {ingredients.map((ingrediente, index) => (
          <div data-testid={`${index}-ingredient-name-and-measure`} key={index}>
            {`º ${ingrediente} - ${measures[index]}`}
          </div>
        ))}
      </div>
      <div>{!video ? null : <Video srcVideo={video} />}</div>
      <div className={styles.recomendationCads}>
        <div className={styles.swiper}>
          <Main itemList={itemRecomendation} />
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
