import React, { useState } from 'react';

import shareIcon from '../images/shareIcon.svg';

interface CopyButtonProps {
  type?: string,
  id?: string,
  index: number,
}

const CopyButton = ({ type, id, index }: CopyButtonProps): JSX.Element => {
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

export default CopyButton;
