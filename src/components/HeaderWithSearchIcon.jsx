import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Input from './Input';
import Button from './Button';
import { getIngrediente, getNome, getPrimeiraletra } from '../services/getFood';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [radioValue, setRadioValue] = useState('ingredient-radio');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = () => {
    if (radioValue === 'ingredient-radio') getIngrediente(searchValue);
    else if (radioValue === 'name-radio') getNome(searchValue);
    else {
      if (searchValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      getPrimeiraletra(searchValue);
    }
  };

  function renderInput() {
    return (
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar receita"
        value={ searchValue }
        onChange={ (e) => setSearchValue(e.target.value) }
      />
    );
  }

  function renderRadioButtons() {
    return (
      <>
        <Input
          dataID="ingredient-search-radio"
          type="radio"
          label="Ingrediente"
          id="ingredient-radio"
          name="endpoint"
          onChange={ (e) => setRadioValue(e.target.id) }
        />
        <Input
          dataID="name-search-radio"
          type="radio"
          label="Nome"
          name="endpoint"
          id="name-radio"
          onChange={ (e) => setRadioValue(e.target.id) }
        />
        <Input
          dataID="first-letter-search-radio"
          type="radio"
          name="endpoint"
          label="Primeira letra"
          id="first-letter-radio"
          onChange={ (e) => setRadioValue(e.target.id) }
        />
      </>
    );
  }

  function renderSearchButton() {
    return (
      <Button
        type="button"
        text="Buscar"
        dataID="exec-search-btn"
        onClick={ handleSearchInput }
      />
    );
  }

  function renderSearchBar() {
    return [renderInput(), renderRadioButtons(), renderSearchButton()];
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
        <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
          />
        </button>
        {showSearchBar && renderSearchBar()}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
