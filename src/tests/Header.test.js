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

describe('Testa se o componente Header funciona devidamente', () => {
  test('9 - Testa os elementos do header na tela principal', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    expect(history.location.pathname).toEqual('/comidas');

    expect(getSearchButton()).toBeInTheDocument();
    expect(getPageTitle()).toBeInTheDocument();
    expect(getProfileButton()).toBeInTheDocument();
  });

  test('10 - Verifica o título e os ícones', () => {
    const { history } = renderWithRouter(<App />);

    expect(getPageTitle()).toBeNull();
    expect(getProfileButton()).toBeNull();
    expect(getSearchButton()).toBeNull();

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchButton().src).toContain(searchIcon);
    expect(getProfileButton().src).toContain(profileIcon);

    history.push('/bebidas');
    expect(history.location.pathname).toEqual('/bebidas');
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchButton().src).toContain(searchIcon);
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(`/comidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}`);
    expect(getPageTitle()).toBeNull();
    expect(getProfileButton()).toBeNull();
    expect(getSearchButton()).toBeNull();

    history.push(`/comidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}/in-progress`);
    expect(getPageTitle()).toBeNull();
    expect(getProfileButton()).toBeNull();
    expect(getSearchButton()).toBeNull();

    history.push(`/bebidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}`);
    expect(getPageTitle()).toBeNull();
    expect(getProfileButton()).toBeNull();
    expect(getSearchButton()).toBeNull();

    history.push(`/bebidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}/in-progress`);
    expect(getPageTitle()).toBeNull();
    expect(getProfileButton()).toBeNull();
    expect(getSearchButton()).toBeNull();

    history.push('/explorar');
    expect(history.location.pathname).toEqual('/explorar');
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(explorarComidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarComidasIngredientesLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(explorarBebidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarBebidasIngredientesLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(explorarComidasAreaLink);
    expect(history.location.pathname).toEqual(explorarComidasAreaLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeTruthy();
    expect(getSearchButton().src).toContain(searchIcon);
    expect(getProfileButton().src).toContain(profileIcon);

    history.push('/perfil');
    expect(history.location.pathname).toEqual('/perfil');
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(receitasFavoritasLink);
    expect(history.location.pathname).toEqual(receitasFavoritasLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);

    history.push(receitasFeitasLink);
    expect(history.location.pathname).toEqual(receitasFeitasLink);
    expect(getPageTitle()).toBeTruthy();
    expect(getProfileButton()).toBeTruthy();
    expect(getSearchButton()).toBeNull();
    expect(getProfileButton().src).toContain(profileIcon);
  });

  test('11 - Verifica se o link pro profile funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push('/bebidas');
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push('/explorar');
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push(explorarComidasLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push('/explorar/bebidas');
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push(explorarComidasIngredientesLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push(explorarBebidasIngredientesLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push(explorarComidasAreaLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push('/perfil');
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());

    expect(history.location.pathname).toEqual('/perfil');
    history.push(receitasFavoritasLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');

    history.push(receitasFeitasLink);
    expect(getProfileButton()).toBeTruthy();
    userEvent.click(getProfileButton());
    expect(history.location.pathname).toEqual('/perfil');
  });

  test('12 - Testa a funcionalidade do SearchButton', () => {
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
