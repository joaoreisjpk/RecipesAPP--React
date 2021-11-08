import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Input from './Input';
import Button from './Button';
import { getIngrediente, getNome, getPrimeiraletra } from '../services/getFood';
import {
  getDrinkIngrediente,
  getDrinkNome,
  getDrinkPrimeiraletra } from '../services/getDrink';

function Header({ title }) {
  const INGREDIENT_RADIO = 'ingredient-radio';
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [radioValue, setRadioValue] = useState(INGREDIENT_RADIO);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = () => {
    if (radioValue === INGREDIENT_RADIO) return getIngrediente(searchValue);
    if (radioValue === 'name-radio') return getNome(searchValue);

    if (searchValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return getPrimeiraletra(searchValue);
  };

  const handleSearchInputDrink = () => {
    if (radioValue === INGREDIENT_RADIO) return getDrinkIngrediente(searchValue);
    if (radioValue === 'name-radio') return getDrinkNome(searchValue);

    if (searchValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return getDrinkPrimeiraletra(searchValue);
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
          selected="true"
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
  const location = useLocation();
  const validatePage = location.pathname === '/comidas'
    ? handleSearchInput
    : handleSearchInputDrink;

  function renderSearchButton() {
    return (
      <Button
        type="button"
        text="Buscar"
        dataID="exec-search-btn"
        onClick={ validatePage }
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
