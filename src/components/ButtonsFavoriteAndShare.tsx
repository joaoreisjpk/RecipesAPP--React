import React, { useEffect, useState } from 'react';
import { isFavorite, handleFavorite } from '../helpers';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

interface ButtonsProps {
  object: any;
  handleUpdate?: () => void;
  idShare?: string;
  idFavorite?: string;
}

const ButtonsFavoriteAndShare = ({ object, handleUpdate, idShare, idFavorite }: ButtonsProps): JSX.Element => {
  const { id, title, type } = object;
  
  const [copiado, setCopiado] = useState(false);
  const [favorited, setFavorited] = useState(isFavorite(id));

  useEffect(() => {
    setFavorited(isFavorite(id));
  }, [id]);

  const handleClick = () => {
    setFavorited(!favorited);
    handleFavorite({ ...object });
    if (handleUpdate) handleUpdate();
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
      .catch((error) => `Doidera Manobrow${error}`);
    setCopiado(true);
  };

  return (
    <>
      <button type="button" onClick={ handleCopy }>
        <img
          src={ shareIcon }
          alt={ title }
          data-testid={ idShare || 'share-btn' }
        />
      </button>

      <button type="button" onClick={ handleClick }>
        { favorited
          ? (
            <img
              src={ blackHeartIcon }
              alt={ title }
              data-testid={ idFavorite || 'favorite-btn' }
            />)
          : (
            <img
              src={ whiteHeartIcon }
              alt={ title }
              data-testid={ idFavorite || 'favorite-btn' }
            />)}
      </button>

      { copiado && <p>Link copiado!</p>}

    </>
  );
};

export default ButtonsFavoriteAndShare;
