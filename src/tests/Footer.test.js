import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const EMAIL = 'trybe@tryber.com';
const PASSWORD = '12345678';
const idTest = 'test';

const receitasFavoritasLink = '/receitas-favoritas';
const explorarComidasLink = '/explorar/comidas';
const explorarComidasIngredientesLink = '/explorar/comidas/ingredientes';
const explorarBebidasIngredientesLink = '/explorar/bebidas/ingredientes';
const explorarComidasAreaLink = '/explorar/comidas/area';
const receitasFeitasLink = '/receitas-feitas';

const getEmail = () => screen.getByRole('textbox', {
  name: /e-mail/i,
});
const getPassword = () => screen.getByLabelText(/senha/i);
const getButton = () => screen.getByRole('button', {
  name: /entrar/i,
});
const getFooter = () => screen.queryByTestId('footer');
const getDrinkButton = () => screen.queryByTestId('drinks-bottom-btn');
const getExploreButton = () => screen.queryByTestId('explore-bottom-btn');
const getFoodButton = () => screen.queryByTestId('food-bottom-btn');

const footerToBeInTheDocument = () => {
  expect(getFooter()).toBeTruthy();
  expect(getDrinkButton()).toBeTruthy();
  expect(getExploreButton()).toBeTruthy();
  expect(getFoodButton()).toBeTruthy();
  expect(getFooter().style.position).toBe('fixed');
  expect(screen.getByAltText(/drink icon/i).src).toContain(drinkIcon);
  expect(screen.getByAltText(/explore icon/i).src).toContain(exploreIcon);
  expect(screen.getByAltText(/meal icon/i).src).toContain(mealIcon);
};

const footerNotToBeInTheDocument = () => {
  expect(getFooter()).toBeNull();
  expect(getDrinkButton()).toBeNull();
  expect(getFoodButton()).toBeNull();
  expect(getExploreButton()).toBeNull();
};

const loadBeforeEach = () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    userEvent.type(getPassword(), PASSWORD);
    userEvent.click(getButton());
  });
};

describe('Testa se o footer é como o esperado', () => {
  loadBeforeEach();

  test('19 - Testa os data-test-id na tela Foods', () => {
    footerToBeInTheDocument();
  });

  test(`20 - Testa se o footer está fixado no final da
  página e possui os ícones esperados`, () => {
    expect(getFooter().style.position).toBe('fixed');
    expect(screen.getByAltText(/drink icon/i).src).toContain(drinkIcon);
    expect(screen.getByAltText(/explore icon/i).src).toContain(exploreIcon);
    expect(screen.getByAltText(/meal icon/i).src).toContain(mealIcon);
  });
});

describe('21 - Testa se ele', () => {
  test('Verifica as páginas de comidas e bebidas', () => {
    const { history } = renderWithRouter(<App />);

    footerNotToBeInTheDocument();

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');
    footerToBeInTheDocument();

    history.push('/bebidas');
    expect(history.location.pathname).toEqual('/bebidas');
    footerToBeInTheDocument();

    history.push(`/comidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}`);
    footerNotToBeInTheDocument();

    history.push(`/comidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/comidas/${idTest}/in-progress`);
    footerNotToBeInTheDocument();

    history.push(`/bebidas/${idTest}`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}`);
    footerNotToBeInTheDocument();

    history.push(`/bebidas/${idTest}/in-progress`);
    expect(history.location.pathname).toEqual(`/bebidas/${idTest}/in-progress`);
    footerNotToBeInTheDocument();
  });

  test('Verifica as páginas explorar', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explorar');
    expect(history.location.pathname).toEqual('/explorar');
    footerToBeInTheDocument();

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    footerToBeInTheDocument();

    history.push(explorarComidasLink);
    expect(history.location.pathname).toEqual(explorarComidasLink);
    footerToBeInTheDocument();

    history.push(explorarComidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarComidasIngredientesLink);
    footerToBeInTheDocument();

    history.push(explorarBebidasIngredientesLink);
    expect(history.location.pathname).toEqual(explorarBebidasIngredientesLink);
    footerToBeInTheDocument();

    history.push(explorarComidasAreaLink);
    expect(history.location.pathname).toEqual(explorarComidasAreaLink);
    footerToBeInTheDocument();
  });

  test('Verifica as outras páginas', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/perfil');
    expect(history.location.pathname).toEqual('/perfil');
    footerToBeInTheDocument();

    history.push(receitasFavoritasLink);
    expect(history.location.pathname).toEqual(receitasFavoritasLink);
    footerNotToBeInTheDocument();

    history.push(receitasFeitasLink);
    expect(history.location.pathname).toEqual(receitasFeitasLink);
    footerNotToBeInTheDocument();
  });
});
