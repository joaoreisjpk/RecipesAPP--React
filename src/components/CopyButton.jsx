import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const CopyButton = ({ type, id, index }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
      .catch((error) => `Doidera Manobrow${error}`);
    setCopiado(true);
  };

  return (
    <>
      <button type="button" onClick={ () => handleCopy() }>
        <img
          src={ shareIcon }
          alt="Share Button"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      { copiado && <p>Link copiado!</p>}
    </>
  );
};

CopyButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CopyButton;
