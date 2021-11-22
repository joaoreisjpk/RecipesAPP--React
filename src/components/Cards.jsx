import PropTypes from 'prop-types';
import React from 'react';

function Cards({ thumbnail, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card`} id="card-div">
      <img id="card-img" src={ thumbnail } alt={ name } data-testid={ `${index}-card-img` } />
      <h3
        data-testid={ `${index}-card-name` }
        id="card-name"
      >
        { name }
      </h3>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Cards;
