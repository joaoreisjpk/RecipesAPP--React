import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CopyButton from '../../components/CopyButton';
import Header from '../../components/Header';
import {
  getDoneList,
} from '../../helpers';
import { DrinkObject } from '../../interfaces';

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

  const handleTags = (index: number, param: string[] | undefined) => (
    param && param.map((tag) => (
      <div key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</div>
    ))
  );

  const fetchDoneList = () => (
    doneList && doneList.filter((item) => item.type !== filter)
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
              </Link>
              <Link to={ `/comidas/${item.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{item.name}</h2>
              </Link>
              <div>{item.category}</div>
              <div data-testid={ `${index}-horizontal-top-text` }>
                {`${item.area} - ${item.category}`}
              </div>
              <div data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</div>
              { handleTags(index, item.tags) }
              <CopyButton type={ item.type } index={ index } id={ item.id } />
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
            <div data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</div>
            { handleTags(index, item.tags) }
            <CopyButton type={ item.type } index={ index } id={ item.id } />
          </React.Fragment>
        );
      })
  );

  return (
    <>
      <Header title="Receitas Feitas" />
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
      { fetchDoneList() }
    </>
  );
}

export default DoneRecipes;
