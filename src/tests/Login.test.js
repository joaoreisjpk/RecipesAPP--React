import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Testa se a tela de Login funciona devidamente', () => {
  test('1 - Testa se os componentes aparecem na tela', () => {
    renderWithRouter(<App />);
    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getButton()).toBeInTheDocument();
  });

  test('2 - É possível digitar no campo e-mail', () => {
    renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
  });

  test('3 - É possível digitar no campo senha', () => {
    renderWithRouter(<App />);
    userEvent.type(getPassword(), PASSWORD);
  });

  test(`4 - Se o botão só é habilitado após um e-mail válido e uma
  senha maior que 6 caracteres`, async () => {
    renderWithRouter(<App />);
    expect(getButton()).toBeDisabled();
    userEvent.type(getEmail(), '123');
    userEvent.type(getPassword(), '123');
    expect(getButton()).toBeDisabled();

    userEvent.type(getPassword(), PASSWORD);
    expect(getButton()).toBeDisabled();

    userEvent.type(getEmail(), EMAIL);
    expect(getPassword().value).toBe(PASSWORD);
    expect(getEmail().value).toBe(EMAIL);
    expect(getButton()).not.toBeDisabled();
  });

  test(`5 - Se os dois tokens "mealsToken" e "cocktailsToken" são guardados no 
    localStorage após a submissão`, () => {
    renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    userEvent.type(getPassword(), PASSWORD);
    userEvent.click(getButton());
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });

  test(`6 - Se o email da pessoa usuária foi salvo no Local Storage 
  na chave user após submissão`, () => {
    renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    userEvent.type(getPassword(), PASSWORD);
    userEvent.click(getButton());
    expect(localStorage.getItem('user')).toBe(`{"email":"${EMAIL}"}`);
  });

  test('7 - Ao clicar no botao de Entrar muda para a rota /comidas', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(getEmail(), EMAIL);
    fireEvent.change(getPassword(), { target: { value: PASSWORD } });
    userEvent.click(getButton());
    expect(history.location.pathname).toEqual('/comidas');
  });
});
