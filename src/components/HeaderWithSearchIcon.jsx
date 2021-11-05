import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [showInput, setShowInput] = useState(false);

  function clickToShow() {
    if (showInput) setShowInput(false);
    else setShowInput(true);
  }

  function renderInput() {
    return (
      <input type="text" data-testid="search-input" placeholder="Buscar comida/bebida" />
    );
  }

  return (
    <header>
      <nav>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Profile Icon"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ clickToShow }>
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
          />
        </button>
        {showInput ? renderInput() : null}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
