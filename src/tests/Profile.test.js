import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const EMAIL = 'trybe@tryber.com';
const PASSWORD = '12345678';

const getEmail = () => screen.getByRole('textbox', {
  name: /e-mail/i,
});
const getPassword = () => screen.getByLabelText(/senha/i);
const getButton = () => screen.getByRole('button', {
  name: /entrar/i,
});

const getProfileEmail = () => screen.queryByTestId('profile-email');
const getDoneButton = () => screen.queryByTestId('profile-done-btn');
const getFavoriteButton = () => screen.queryByTestId('profile-favorite-btn');
const getLogoutButton = () => screen.queryByTestId('profile-logout-btn');

describe('Testando a tela de Perfil', () => {
  test('82-Testa se a tela possui os data-testid esperados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(getProfileEmail()).toBeTruthy();
    expect(getFavoriteButton()).toBeTruthy();
    expect(getDoneButton()).toBeTruthy();
    expect(getLogoutButton()).toBeTruthy();
  });

  test('83-Testando se o nome e e-mail condizem com os valores preenchidos', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    userEvent.type(getPassword(), PASSWORD);
    userEvent.click(getButton());
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
    expect(getProfileEmail().innerHTML).toBe(EMAIL);
  });

  test('84-Testando o texto dos botões', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(getDoneButton().innerHTML).toBe('Receitas Feitas');
    expect(getFavoriteButton().innerHTML).toBe('Receitas Favoritas');
    expect(getLogoutButton().innerHTML).toBe('Sair');
  });

  test('84-Testando a funcionalidade do botão Receitas Favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    userEvent.click(getFavoriteButton());
    expect(screen.getAllByText(/Favoritas/i));
  });

  test('85-Testando a funcionalidade do botão Receitas Feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    userEvent.click(getDoneButton());
    expect(screen.getAllByText(/Receitas Feitas/i));
  });

  test('86-Testando a funcionalidade do botão logout', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    userEvent.type(getPassword(), PASSWORD);
    userEvent.click(getButton());
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
    userEvent.click(getLogoutButton());
    getProfileEmail();
    getPassword();
    getButton();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
