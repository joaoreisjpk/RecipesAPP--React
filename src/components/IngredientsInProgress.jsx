/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function IngredientsInProgress({
  index,
  ingrediente,
  measures,
  idMeal,
  idDrink,
  handleButton }) {
  const [checked, setChecked] = useState(false);
  const keyInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const id = idDrink || idMeal;

  useEffect(() => {
    if (idDrink) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgress.cocktails,
          [id]: [...keyInProgress.cocktails[id]],
        },
        meals: {
          ...keyInProgress.meals,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgress.cocktails,
        },
        meals: {
          ...keyInProgress.meals,
          [id]: [...keyInProgress.meals[id]],
        },
      }));
    }
  }, []);

  useEffect(() => {
    setChecked(idDrink
      ? keyInProgress.cocktails[id].some((ingredient) => ingredient === index)
      : keyInProgress.meals[id].some((ingredient) => ingredient === index));
  }, []);

  function addIngredientInLocalStorage() {
    const keyInProgress2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(checked, index);
    if (idDrink) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgress2.cocktails,
          [id]: !checked
            ? [...keyInProgress2.cocktails[id], index]
            : [...keyInProgress2.cocktails[id]
              .filter((ingredient) => ingredient !== index)],
        },
        meals: {
          ...keyInProgress2.meals,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...keyInProgress2.meals,
          [id]: !checked
            ? [...keyInProgress2.meals[id], index]
            : [...keyInProgress2.meals[id].filter((ingredient) => ingredient !== index)],
        },
        cocktails: {
          ...keyInProgress2.cocktails,
        },
      }));
    }
  }

  // useEffect(() => {
  //   addIngredientInLocalStorage();
  //   console.log(checked);
  // }, [checked]);

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label
        style={ checked ? { textDecoration: 'line-through' } : null }
        htmlFor={ ingrediente }
      >
        <input
          type="checkbox"
          id={ ingrediente }
          checked={ checked }
          onChange={ () => {
            setChecked(!checked);
            addIngredientInLocalStorage();
            handleButton();
          } }
        />
        <span>{ `Ingrediente: ${ingrediente} - Medida: ${measures[index]}` }</span>
      </label>
    </div>
  );
}

IngredientsInProgress.propTypes = {
  handleButton: PropTypes.func.isRequired,
  idDrink: PropTypes.number.isRequired,
  idMeal: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsInProgress;
