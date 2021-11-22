import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <Link key="2927128" to="/perfil">
        <img
          id="profile-top-btn"
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile Icon"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
