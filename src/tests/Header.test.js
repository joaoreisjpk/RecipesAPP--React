import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const idTest = 'test';

const receitasFavoritasLink = '/receitas-favoritas';
const explorarComidasLink = '/explorar/comidas';
const explorarComidasIngredientesLink = '/explorar/comidas/ingredientes';
const explorarBebidasIngredientesLink = '/explorar/bebidas/ingredientes';
const explorarComidasAreaLink = '/explorar/comidas/area';
const receitasFeitasLink = '/receitas-feitas';

const getPageTitle = () => screen.queryByTestId('page-title');
const getProfileButton = () => screen.queryByTestId('profile-top-btn');
const getSearchButton = () => screen.queryByTestId('search-top-btn');
const getSearchInput = () => screen.queryByTestId('search-input');

const headerNotToBeInTheDocument = () => {
  expect(getPageTitle()).toBeNull();
  expect(getProfileButton()).toBeNull();
  expect(getSearchButton()).toBeNull();
};

const onlyProfileButtonInTheDocument = () => {
  expect(getPageTitle()).toBeTruthy();
  expect(getProfileButton()).toBeTruthy();
  expect(getSearchButton()).toBeNull();
  expect(getProfileButton().src).toContain(profileIcon);
};

const headerToBeInTheDocument = () => {
  expect(getPageTitle()).toBeTruthy();
  expect(getProfileButton()).toBeTruthy();
  expect(getSearchButton()).toBeTruthy();
  expect(getSearchButton().src).toContain(searchIcon);
  expect(getProfileButton().src).toContain(profileIcon);
};

describe('9 Testa os elementos do header na tela principal', () => {
  test('Testa os elementos do header na tela principal', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    expect(history.location.pathname).toEqual('/comidas');

    expect(getSearchButton()).toBeInTheDocument();
    expect(getPageTitle()).toBeInTheDocument();
    expect(getProfileButton()).toBeInTheDocument();
  });
});

describe('10 - Testa se o Header aparece propriamente nas paginas', () => {
  test('Verifica as páginas de comidas e bebidas', () => {
    const { history } = renderWithRouter(<App />);

    headerNotToBeInTheDocument();

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');
    headerToBeInTheDocument();

    history.push('/bebidas');
    expect(history.location.pathname).toEqual('/bebidas');
    headerToBeInTheDocument();

    history.push(`/comidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}`);
    headerNotToBeInTheDocument();

    history.push(`/comidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}/in-progress`);
    headerNotToBeInTheDocument();

    history.push(`/bebidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}`);
    headerNotToBeInTheDocument();

    history.push(`/bebidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}/in-progress`);
    headerNotToBeInTheDocument();
  });

  test('Verifica as páginas explorar', () => {
    const { history } = renderWithRouter(<App />);

    headerNotToBeInTheDocument();

    history.push('/explorar');
    expect(history.location.pathname).toEqual('/explorar');
    onlyProfileButtonInTheDocument();

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    onlyProfileButtonInTheDocument();

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    onlyProfileButtonInTheDocument();

    history.push(explorarComidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarComidasIngredientesLink);
    onlyProfileButtonInTheDocument();

    history.push(explorarBebidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarBebidasIngredientesLink);
    onlyProfileButtonInTheDocument();

    history.push(explorarComidasAreaLink);
    expect(history.location.pathname).toEqual(explorarComidasAreaLink);
    headerToBeInTheDocument();
  });

  test('Verifica as outras páginas', () => {
    const { history } = renderWithRouter(<App />);

    headerNotToBeInTheDocument();

    history.push('/perfil');
    expect(history.location.pathname).toEqual('/perfil');
    onlyProfileButtonInTheDocument();

    history.push(receitasFavoritasLink);
    expect(history.location.pathname).toEqual(receitasFavoritasLink);
    onlyProfileButtonInTheDocument();

    history.push(receitasFeitasLink);
    expect(history.location.pathname).toEqual(receitasFeitasLink);
    onlyProfileButtonInTheDocument();
  });
});

const checkProfileButtonFuncionality = (history) => {
  expect(getProfileButton()).toBeTruthy();
  userEvent.click(getProfileButton());
  expect(history.location.pathname).toEqual('/perfil');
};

describe('11 -Verifica se o link pro profile funciona devidamente', () => {
  test('Verifica as páginas comidas, bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    checkProfileButtonFuncionality(history);

    history.push('/bebidas');
    checkProfileButtonFuncionality(history);
  });

  test('Verifica as páginas explorar', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explorar');
    checkProfileButtonFuncionality(history);

    history.push(explorarComidasLink);
    checkProfileButtonFuncionality(history);

    history.push('/explorar/bebidas');
    checkProfileButtonFuncionality(history);

    history.push(explorarComidasIngredientesLink);
    checkProfileButtonFuncionality(history);

    history.push(explorarBebidasIngredientesLink);
    checkProfileButtonFuncionality(history);

    history.push(explorarComidasAreaLink);
    checkProfileButtonFuncionality(history);
  });

  test('Verifica as outras páginas', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/perfil');
    checkProfileButtonFuncionality(history);

    history.push(receitasFavoritasLink);
    checkProfileButtonFuncionality(history);

    history.push(receitasFeitasLink);
    checkProfileButtonFuncionality(history);
  });
});

describe('12 - Teste do Requisito 12', () => {
  test('Testa a funcionalidade do SearchButton', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchInput()).toBeNull();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeTruthy();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeNull();

    history.push('/bebidas');
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchInput()).toBeNull();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeTruthy();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeNull();

    history.push(explorarComidasAreaLink);
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchInput()).toBeNull();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeTruthy();
    userEvent.click(getSearchButton());
    expect(getSearchInput()).toBeNull();
  });
});
