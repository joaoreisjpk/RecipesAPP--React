import { screen, waitForElementToBeRemoved, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import MockDrinkData from './mocks/Drinks/mockDrinks';
import oneDrink from './mocks/Drinks/oneDrink';
import mockItemFilterByName from './mocks/Foods/fetchGetByName';
import MockData from './mocks/NameMeatMock';

const URL_INGREDIENTE = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const URL_NOME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_PRIMEIRALETRA = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const URL_D_INGREDIENTE = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const URL_D_NOME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_D_PRIMEIRALETRA = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const getIngredientRadio = () => screen.queryByTestId('ingredient-search-radio');
const getNameRadio = () => screen.queryByTestId('name-search-radio');
const getFirstLetterRadio = () => screen.queryByTestId('first-letter-search-radio');
const getExecBtn = () => screen.queryByTestId('exec-search-btn');
const getSearchButton = () => screen.queryByTestId('search-top-btn');
const getSearchInput = () => screen.queryByTestId('search-input');

const mockFetch = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: async () => Promise.resolve(MockData),
    }));
};

const mockDrinkFetch = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: async () => Promise.resolve(MockDrinkData),
    }));
};

describe('Testa se a barra de buscas possui os data-testid', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  test('13 - Testa se s id aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    act(() => {
      userEvent.click(getSearchButton());
    });
    expect(getIngredientRadio()).toBeTruthy();
    expect(getNameRadio()).toBeTruthy();
    expect(getFirstLetterRadio()).toBeTruthy();
    expect(getExecBtn()).toBeTruthy();
  });

  test('14 - Testa se as chamadas API funcionam devidamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    act(() => userEvent.click(getSearchButton()));
    act(() => {
      userEvent.click(getNameRadio());
      userEvent.type(getSearchInput(), 'Meat');
    });
    userEvent.click(getExecBtn());
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_INGREDIENTE}Meat`);
    expect(global.fetch).toHaveBeenCalledWith(`${URL_NOME}Meat`);
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_PRIMEIRALETRA}Meat`);

    act(() => {
      userEvent.click(getIngredientRadio());
      userEvent.type(getSearchInput(), 'Water');
    });
    userEvent.click(getExecBtn());
    expect(global.fetch).toHaveBeenCalledWith(`${URL_INGREDIENTE}Water`);
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_NOME}Water`);
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_PRIMEIRALETRA}Water`);

    act(() => {
      userEvent.click(getFirstLetterRadio());
      userEvent.type(getSearchInput(), 'A');
    });
    userEvent.click(getExecBtn());
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_INGREDIENTE}A`);
    expect(global.fetch).not.toHaveBeenCalledWith(`${URL_NOME}A`);
    expect(global.fetch).toHaveBeenCalledWith(`${URL_PRIMEIRALETRA}A`);

    global.alert = jest.fn(() => {});

    act(() => {
      userEvent.click(getFirstLetterRadio());
      userEvent.type(getSearchInput(), 'ab');
    });
    userEvent.click(getExecBtn());
    expect(global.alert).toBeCalled();
  });
});

describe('Continuação da Barra de Buscas', () => {
  beforeAll(mockDrinkFetch);
  beforeEach(cleanup);

  test('15 - Testa se a Api é chamada corretamente na tela de bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    act(() => userEvent.click(getSearchButton()));
    act(() => {
      userEvent.click(getNameRadio());
      userEvent.type(getSearchInput(), 'Water');
    });
    userEvent.click(getExecBtn());
    act(() => {
      userEvent.click(getIngredientRadio());
      userEvent.type(getSearchInput(), 'Ice');
    });
    userEvent.click(getExecBtn());
    act(() => {
      userEvent.click(getFirstLetterRadio());
      userEvent.type(getSearchInput(), 'B');
    });
    userEvent.click(getExecBtn());

    expect(global.fetch).toHaveBeenCalledWith(`${URL_D_INGREDIENTE}Ice`);
    expect(global.fetch).toHaveBeenCalledWith(`${URL_D_NOME}Water`);
    expect(global.fetch).toHaveBeenCalledWith(`${URL_D_PRIMEIRALETRA}B`);
  });
});

describe('Continuação do SearchHeader', () => {
  test('16 - Testa o redirecionamento caso encontre apenas uma bebida',
    async () => {
      const mockReq16 = async () => {
        jest.spyOn(global, 'fetch')
          .mockImplementation(() => Promise.resolve({
            status: 200,
            ok: true,
            json: async () => Promise.resolve(oneDrink),
          }));
      };
      mockReq16();

      const { history } = renderWithRouter(<App />);
      history.push('/bebidas');

      act(() => userEvent.click(getSearchButton()));
      act(() => {
        userEvent.click(getNameRadio());
        userEvent.type(getSearchInput(), 'Aquamarine');
      });
      userEvent.click(getExecBtn());

      await waitForElementToBeRemoved(
        () => getExecBtn(),
        { timeout: 1000 },
      );

      expect(history.location.pathname).toBe('/bebidas/178319');
    });

  test('16 - Testa o redirecionamento caso encontre apenas uma comida',
    async () => {
      const mockReq16 = async () => {
        jest.spyOn(global, 'fetch')
          .mockImplementation(() => Promise.resolve({
            status: 200,
            ok: true,
            json: async () => Promise.resolve(mockItemFilterByName),
          }));
      };
      mockReq16();

      const { history } = renderWithRouter(<App />);
      history.push('/comidas');

      act(() => userEvent.click(getSearchButton()));
      act(() => {
        userEvent.click(getNameRadio());
        userEvent.type(getSearchInput(), 'Corba');
      });
      userEvent.click(getExecBtn());

      await waitForElementToBeRemoved(
        () => getExecBtn(),
        { timeout: 1000 },
      );

      expect(history.location.pathname).toBe('/comidas/52977');
    });

  test('17 - Testa os cards caso tenha mais de uma comida', async () => {
    mockFetch();

    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await screen.findByTestId('0-recipe-card');
    screen.getByTestId('0-card-img');
    screen.getByTestId('0-card-name');

    screen.getByTestId('2-recipe-card');
    screen.getByTestId('2-card-img');
    screen.getByTestId('2-card-name');

    screen.getByTestId('6-recipe-card');
    screen.getByTestId('6-card-img');
    screen.getByTestId('6-card-name');

    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-card-img')).toBeNull();
    expect(screen.queryByTestId('12-card-name')).toBeNull();
  });

  test('17.2 - Testa os cards caso tenha mais de uma bebida', async () => {
    mockDrinkFetch();

    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    await screen.findByTestId('0-recipe-card');
    screen.getByTestId('0-card-img');
    screen.getByTestId('0-card-name');

    screen.getByTestId('2-recipe-card');
    screen.getByTestId('2-card-img');
    screen.getByTestId('2-card-name');

    screen.getByTestId('6-recipe-card');
    screen.getByTestId('6-card-img');
    screen.getByTestId('6-card-name');

    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-card-img')).toBeNull();
    expect(screen.queryByTestId('12-card-name')).toBeNull();
  });
});
