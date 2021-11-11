import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { isFavorite, handleFavorite } from '../helpers';

const ButtonsFavoriteAndShare = ({ object, handleUpdate, idShare, idFavorite }) => {
  const [copiado, setCopiado] = useState(false);
  const [favorited, setFavorited] = useState();

  const id = object.idMeal || object.idDrink || object.id;
  const title = object.title || object.name;

  console.log(isFavorite(id), id, favorited);

  useEffect(() => {
    console.log('montou');
    setFavorited(isFavorite(id));
  }, [id]);

  const handleClick = () => {
    setFavorited(!favorited);
    handleFavorite({ ...object });
    if (handleUpdate) handleUpdate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${object.type}s/${id}`)
      .catch((error) => `Doidera Manobrow${error}`);
    setCopiado(true);
  };

  return (
    <div>
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

    </div>
  );
};

ButtonsFavoriteAndShare.propTypes = {
  object: PropTypes.objectOf(PropTypes.any).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  idShare: PropTypes.string.isRequired,
  idFavorite: PropTypes.string.isRequired,
};

export default ButtonsFavoriteAndShare;
