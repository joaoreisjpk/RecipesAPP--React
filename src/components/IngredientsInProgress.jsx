import PropTypes from 'prop-types';
import React, { useState } from 'react';

function IngredientsInProgress({ index, ingrediente, measures }) {
  const [checked, setChecked] = useState(false);

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label
        style={ checked ? { textDecoration: 'line-through' } : null }
        htmlFor={ ingrediente }
      >
        <input
          data-testid={ `${index}-ingredient-step` }
          type="checkbox"
          id={ ingrediente }
          checked={ checked }
          onClick={ () => setChecked(!checked) }
        />
        <span>{ `Ingrediente: ${ingrediente} - Medida: ${measures[index]}` }</span>
      </label>
    </div>
  );
}

IngredientsInProgress.propTypes = {
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsInProgress;
