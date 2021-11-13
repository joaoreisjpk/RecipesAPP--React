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
  const [checked, setChecked] = useState(true);
  const id = idDrink || idMeal;

  const keyInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    console.log(id, 'bebidaID:', idDrink, 'comidaID:', idDrink);
    setChecked(idDrink
      ? keyInProgress().cocktails[id].some((ingredient) => ingredient === index)
      : keyInProgress().meals[id].some((ingredient) => ingredient === index));
  }, []);

  function addIngredientInLocalStorage() {
    if (idDrink) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgress().cocktails,
          [id]: !checked
            ? [...keyInProgress().cocktails[id], index]
            : [...keyInProgress().cocktails[id]
              .filter((ingredient) => ingredient !== index)],
        },
        meals: {
          ...keyInProgress().meals,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...keyInProgress().meals,
          [id]: !checked
            ? [...keyInProgress().meals[id], index]
            : [...keyInProgress().meals[id].filter((ingredient) => ingredient !== index)],
        },
        cocktails: {
          ...keyInProgress().cocktails,
        },
      }));
    }
  }

  const handleChange = () => {
    setChecked(!checked);
    addIngredientInLocalStorage();
    handleButton();
  };

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label
        style={ checked ? { textDecoration: 'line-through' } : null }
        htmlFor={ ingrediente }
      >
        { !checked ? (
          <input
            key="!checked"
            type="checkbox"
            id={ ingrediente }
            onChange={ handleChange }
          />)
          : (
            <input
              key="checked"
              type="checkbox"
              checked
              id={ ingrediente }
              onChange={ handleChange }
            />)}
        <span>{ `Ingrediente: ${ingrediente} - Medida: ${measures[index]}` }</span>
      </label>
    </div>
  );
}

IngredientsInProgress.propTypes = {
  handleButton: PropTypes.func.isRequired,
  idDrink: PropTypes.string.isRequired,
  idMeal: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsInProgress;
