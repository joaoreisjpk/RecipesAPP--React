import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonsFavoriteAndShare from '../../components/ButtonsFavoriteAndShare';
import Header from '../../components/Header';
import {
  getFavoriteList,
} from '../../helpers';
import { DrinkObject } from '../../interfaces';

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
    <>
      <button
        type="button"
        onClick={ () => setFilter('bebida') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => setFilter('comida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ () => setFilter('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
    </>
  );

  const fetchFavoriteList = () => (
    favoriteList && favoriteList.filter((item) => item.type !== filter)
      .map((item, index) => {
        if (item.type === 'comida') {
          return (
            <React.Fragment key={ index }>
              <Link to={ `/comidas/${item.id}` }>
                <img
                  width="200px"
                  src={ item.image }
                  alt="comida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{item.name}</h2>
              </Link>
              <div>{item.category}</div>
              <div data-testid={ `${index}-horizontal-top-text` }>
                {`${item.area} - ${item.category}`}
              </div>
              <ButtonsFavoriteAndShare
                object={ item }
                handleUpdate={ handleUpdate }
                idShare={ `${index}-horizontal-share-btn` }
                idFavorite={ `${index}-horizontal-favorite-btn` }
              />
            </React.Fragment>
          );
        } return (
          <React.Fragment key={ index }>
            <Link to={ `/bebidas/${item.id}` }>
              <img
                width="200px"
                src={ item.image }
                alt="bebida"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link to={ `/bebidas/${item.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{item.name}</h2>
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot}
            </div>
            <div>{item.alcoholicOrNot}</div>
            <ButtonsFavoriteAndShare
              object={ item }
              handleUpdate={ handleUpdate }
              idShare={ `${index}-horizontal-share-btn` }
              idFavorite={ `${index}-horizontal-favorite-btn` }
            />
          </React.Fragment>
        );
      })
  );

  return (
    <>
      <Header title="Receitas Favoritas" />
      { fetchFilterButtons() }
      { fetchFavoriteList() }
    </>
  );
}

export default FavoriteRecipes;
