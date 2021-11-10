import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const Buttons = ({ handleFavorite, isFavorite, title, type, id }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopiado(true);
  };

  return (
    <div>
      <button type="button" onClick={ handleCopy }>
        <img data-testid="share-btn" src={ shareIcon } alt={ title } />
      </button>

      <button type="button" onClick={ handleFavorite }>
        { isFavorite
          ? <img src={ blackHeartIcon } alt={ title } data-testid="favorite-btn" />
          : <img src={ whiteHeartIcon } alt={ title } data-testid="favorite-btn" />}
      </button>

      { copiado && <p>Link copiado!</p>}

    </div>
  );
};

Buttons.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Buttons;
