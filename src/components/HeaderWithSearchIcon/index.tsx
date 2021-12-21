import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import FetchCategories from '../FetchCategories';
import { foodSmallAPi, foodAPI } from '../../services/getFood';
import { drinkSmallAPI, drinkAPI } from '../../services/getDrink';
import MyContext from '../../context/MyContext';
import Button from '../Button';

import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import styles from './main.module.scss';

interface HeaderProps {
  title: string;
  categories?: () => JSX.Element;
}

function HeaderWithSearchIcon({ title, categories }: HeaderProps) {
  const { setRespostaDrink, setRespostaFood } = useContext(MyContext);
  const INGREDIENT_RADIO = 'ingredient-radio';
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [radioValue, setRadioValue] = useState(INGREDIENT_RADIO);
  const [searchValue, setSearchValue] = useState('');
  const { pathname } = useRouter();

  const handleSearchInput = async () => {
    if (radioValue === INGREDIENT_RADIO) {
      setRespostaFood(await foodSmallAPi(`/filter.php?i=${searchValue}`));
    } else if (radioValue === 'name-radio') {
      setRespostaFood(await foodAPI(`/search.php?s=${searchValue}`));
    } else if (searchValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else setRespostaFood(await foodAPI(`/search.php?f=${searchValue}`));
  };

  const handleSearchInputDrink = async () => {
    if (radioValue === INGREDIENT_RADIO) {
      setRespostaDrink(await drinkSmallAPI(`/filter.php?i=${searchValue}`));
    } else if (radioValue === 'name-radio') {
      setRespostaDrink(await drinkAPI(`/search.php?s=${searchValue}`));
    } else if (searchValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else setRespostaDrink(await drinkAPI(`/search.php?f=${searchValue}`));
  };

  function renderSearchContainer() {
    return (
      <div className={styles.header}>
        <input
          type='text'
          data-testid='search-input'
          placeholder='Buscar receita'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div>
          <label htmlFor='ingredient-radio'>
            Ingrediente
            <input
              data-testid='ingredient-search-radio'
              type='radio'
              checked={radioValue === 'ingredient-radio'}
              id='ingredient-radio'
              name='endpoint'
              onChange={(e) => setRadioValue(e.target.id)}
            />
          </label>
          <label htmlFor='name-radio'>
            Nome
            <input
              data-testid='name-search-radio'
              type='radio'
              name='endpoint'
              id='name-radio'
              checked={radioValue === 'name-radio'}
              onChange={(e) => setRadioValue(e.target.id)}
            />
          </label>
          <label htmlFor='first-letter-radio'>
            Primeira letra
            <input
              data-testid='first-letter-search-radio'
              type='radio'
              name='endpoint'
              id='first-letter-radio'
              checked={radioValue === 'first-letter-radio'}
              onChange={(e) => setRadioValue(e.target.id)}
            />
          </label>
        </div>
        <Button
          text='Buscar'
          dataID='exec-search-btn'
          id='exec-search-btn'
          onClick={validatePage}
        />
      </div>
    );
  }
  const validatePage =
  pathname === '/comidas'
      ? handleSearchInput
      : handleSearchInputDrink;

  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link href='/perfil' passHref>
            <a href="">
              <Image
                src={profileIcon}
                data-testid='profile-top-btn'
                id='profile-top-btn'
                alt='Profile Icon'
              />
            </a>
          </Link>
          <h1 data-testid='page-title'>{title}</h1>
          <button
            type='button'
            onClick={() => setShowSearchBar(!showSearchBar)}
            id='search-top-btn'
          >
            <Image
              src={searchIcon}
              data-testid='search-top-btn'
              alt='Search Icon'
            />
          </button>
        </nav>
      </header>
      <>
        {showSearchBar ? renderSearchContainer() : <FetchCategories />}
      </>
    </>
  );
}

export default HeaderWithSearchIcon;
