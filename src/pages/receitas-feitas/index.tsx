import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ButtonsFavoriteAndShare from '../../components/ButtonsFavoriteAndShare';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getDoneList } from '../../helpers';
import { DrinkObject } from '../../interfaces';

import styles from './main.module.scss';

function DoneRecipes() {
  const [doneList, setDoneList] = useState([] as DrinkObject[]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setDoneList(getDoneList());
  }, []);

  const handleFilter = (param: string) => {
    setFilter(param);
    setDoneList(getDoneList());
  };

  const handleTags = (index: number, param: string[] | undefined) =>
    param &&
    param.map((tag) => (
      <div key={tag} data-testid={`${index}-${tag}-horizontal-tag`}>
        {tag}
      </div>
    ));

  const fetchDoneList = () =>
    doneList &&
    doneList
      .filter((item) => item.type !== filter)
      .map((item, index) => {
        if (item.type === 'comida') {
          return (
            <div key={index}>
              <Link href={`/comidas/${item.id}`}>
                <a href="#">
                  <img
                    width='200px'
                    src={item.image}
                    alt='comida'
                    data-testid={`${index}-horizontal-image`}
                  />
                </a>
              </Link>
              <Link href={`/comidas/${item.id}`}>
                <a href="#">
                  <h2 data-testid={`${index}-horizontal-name`}>{item.name}</h2>
                </a>
              </Link>
              <div>{item.category}</div>
              <div data-testid={`${index}-horizontal-top-text`}>
                {`${item.area} - ${item.category}`}
              </div>
              <div data-testid={`${index}-horizontal-done-date`}>
                {item.doneDate}
              </div>
              {handleTags(index, item.tags)}
              <ButtonsFavoriteAndShare
                object={item}
                idShare={`${index}-horizontal-share-btn`}
                idFavorite={`${index}-horizontal-favorite-btn`}
              />
            </div>
          );
        }
        return (
          <div key={index}>
            <Link href={`/bebidas/${item.id}`}>
              <a href="#">
                <img
                  width='200px'
                  src={item.image}
                  alt='bebida'
                  data-testid={`${index}-horizontal-image`}
                />
              </a>
            </Link>
            <Link href={`/bebidas/${item.id}`}>
              <a href="#">
                <h2 data-testid={`${index}-horizontal-name`}>{item.name}</h2>
              </a>
            </Link>
            <div data-testid={`${index}-horizontal-top-text`}>
              {item.alcoholicOrNot}
            </div>
            <div>{item.alcoholicOrNot}</div>
            <div data-testid={`${index}-horizontal-done-date`}>
              {item.doneDate}
            </div>
            {handleTags(index, item.tags)}
            <ButtonsFavoriteAndShare
              object={item}
              idShare={`${index}-horizontal-share-btn`}
              idFavorite={`${index}-horizontal-favorite-btn`}
            />{' '}
          </div>
        );
      });

  return (
    <section className={styles.doneContainer}>
      <Header title='Receitas Feitas' />
      <nav>
        <div>
          <button
            type='button'
            onClick={() => handleFilter('bebida')}
            data-testid='filter-by-food-btn'
          >
            Foods
          </button>
          <button
            type='button'
            onClick={() => handleFilter('comida')}
            data-testid='filter-by-drink-btn'
          >
            Drinks
          </button>
          <button
            type='button'
            onClick={() => handleFilter('')}
            data-testid='filter-by-all-btn'
          >
            All
          </button>
        </div>
      </nav>
      <main>{fetchDoneList()}</main>
      <Footer />
    </section>
  );
}

export default DoneRecipes;
