import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import {
  getFavoriteList,
} from '../helpers';

function FavoriteRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFavoriteList(getFavoriteList());
  }, []);

  const handleFilter = (param) => {
    setFilter(param);
    setFavoriteList(getFavoriteList());
  };

  const handleClick = () => {
    setFavoriteList(getFavoriteList());
  };

  const fetchFavoriteList = () => (
    favoriteList.filter((item) => item.type !== filter)
      .map((item, index) => {
        if (item.type === 'comida') {
          return (
            <>
              <Link to={ `/comidas/${item.id}` }>
                <img
                  width="200px"
                  src={ item.image }
                  alt="comida"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link to={ `/comidas/${item.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{item.name}</h2>
              </Link>
              <div>{item.category}</div>
              <div data-testid={ `${index}-horizontal-top-text` }>
                {`${item.area} - ${item.category}`}
              </div>
              <Buttons
                object={ item }
                handleUpdate={ handleClick }
                idShare={ `${index}-horizontal-share-btn` }
                idFavorite={ `${index}-horizontal-favorite-btn` }
              />
            </>
          );
        } return (
          <>
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
            <Buttons
              object={ item }
              handleUpdate={ handleClick }
              idShare={ `${index}-horizontal-share-btn` }
              idFavorite={ `${index}-horizontal-favorite-btn` }
            />
          </>
        );
      })
  );

  return (
    <>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        onClick={ () => handleFilter('bebida') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => handleFilter('comida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ () => handleFilter('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      { fetchFavoriteList() }
    </>
  );
}

export default FavoriteRecipes;
