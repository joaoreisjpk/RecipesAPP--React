import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ButtonsFavoriteAndShare from '../../components/ButtonsFavoriteAndShare';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getFavoriteList } from '../../helpers';
import { DrinkObject } from '../../interfaces';

import styles from './main.module.scss';

function FavoriteRecipes() {
  const [favoriteList, setFavoriteList] = useState([] as DrinkObject[]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFavoriteList(getFavoriteList());
  }, [filter]);

  const handleUpdate = () => {
    setFavoriteList(getFavoriteList());
  };

  const fetchFilterButtons = () => (
    <div>
      <button
        type='button'
        onClick={() => setFilter('bebida')}
        data-testid='filter-by-food-btn'
      >
        Foods
      </button>
      <button
        type='button'
        onClick={() => setFilter('comida')}
        data-testid='filter-by-drink-btn'
      >
        Drinks
      </button>
      <button
        type='button'
        onClick={() => setFilter('')}
        data-testid='filter-by-all-btn'
      >
        All
      </button>
    </div>
  );

  const fetchFavoriteList = () =>
    favoriteList &&
    favoriteList
      .filter((item) => item.type !== filter)
      .map((item, index) => {
        if (item.type === 'comida') {
          return (
            <div key={index}>
              <Link href={`/comidas/${item.id}`} passHref>
                <a href='#'>
                  <img
                    width='200px'
                    src={item.image}
                    alt='comida'
                    data-testid={`${index}-horizontal-image`}
                  />
                <h2 data-testid={`${index}-horizontal-name`}>{item.name}</h2>
                </a>
              </Link>
              <div>{item.category}</div>
              <div data-testid={`${index}-horizontal-top-text`}>
                {`${item.area} - ${item.category}`}
              </div>
              <ButtonsFavoriteAndShare
                object={item}
                handleUpdate={handleUpdate}
                idShare={`${index}-horizontal-share-btn`}
                idFavorite={`${index}-horizontal-favorite-btn`}
              />
            </div>
          );
        }
        return (
          <div key={index}>
            <Link passHref href={`/bebidas/${item.id}`}>
              <a>
                <img
                  width='200px'
                  src={item.image}
                  alt='bebida'
                  data-testid={`${index}-horizontal-image`}
                />
              </a>
            </Link>
            <Link href={`/bebidas/${item.id}`} passHref>
              <a href='#'>
                <h2 data-testid={`${index}-horizontal-name`}>{item.name}</h2>
              </a>
            </Link>
            <div data-testid={`${index}-horizontal-top-text`}>
              {item.alcoholicOrNot}
            </div>
            <ButtonsFavoriteAndShare
              object={item}
              handleUpdate={handleUpdate}
              idShare={`${index}-horizontal-share-btn`}
              idFavorite={`${index}-horizontal-favorite-btn`}
            />
          </div>
        );
      });

  return (
    <section className={styles.faritesContainer}>
      <Header title='Receitas Favoritas' />
      <nav>{fetchFilterButtons()}</nav>
      <main>{fetchFavoriteList()}</main>
      <Footer />
    </section>
  );
}

export default FavoriteRecipes;
