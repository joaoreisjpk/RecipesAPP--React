import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved, act } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import MockData from './mocks/NameMeatMock';

const RecipePath = '/comidas/52977';
const RecipeInProgressPath = '/comidas/52977/in-progress';
const BotaoFinalizar = 'finish-recipe-btn';
const StartRecipeButton = 'start-recipe-btn';

const StorageObject = {
  meals: {
    52976: [],
    52977: [0, 1, 2],
  },
  cocktails: {},
};

const StorageObjectAtt = {
  meals: {
    52976: [],
    52977: [0, 1, 2, 2 + 1, 2 * 2, 2 * 2 + 1, 2 * 2 + 2],
  },
  cocktails: {},
};

const mockFetch = async () => ({
  ok: true,
  json: async () => MockData,
});

describe('Testa as APIs do getFood', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('1 - Testa se getIngrediente funciona devidamente', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(RecipePath);

    expect(history.location.pathname).toBe(RecipePath);

    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('recipe-category');
    await expect(screen.findByTestId('0-ingredient-name-and-measure'));
    await screen.findByTestId('1-ingredient-name-and-measure');
    await screen.findByTestId('2-ingredient-name-and-measure');
    await screen.findByTestId('3-ingredient-name-and-measure');
    await screen.findByTestId('4-ingredient-name-and-measure');
    await screen.findByTestId('share-btn');
    await screen.findByTestId('favorite-btn');

    expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();

    expect(screen.getByTestId(StartRecipeButton).innerHTML).toBe(
      'Iniciar Receita',
    );
  });

  test('2 - Testa se o botão troca de valor caso o item já exista no storage',
    async () => {
      const { history } = renderWithRouter(<App />);

      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: { 52977: [] } }),
      );

      history.push(RecipePath);

      await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../), {
        timeout: 1000,
      });

      expect(screen.getByTestId(StartRecipeButton).innerHTML).toBe(
        'Continuar Receita',
      );

      localStorage.removeItem('inProgressRecipes');
    });

  test(`3- Testa se ao clicar no botão a página é
  redirecionada e o localStorage é iniciado`, async () => {
    const { history } = renderWithRouter(<App />);

    history.push(RecipePath);

    expect(history.location.pathname).toBe(RecipePath);

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../), {
      timeout: 1000,
    });

    userEvent.click(screen.getByTestId(StartRecipeButton));

    expect(history.location.pathname).toBe();

    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('recipe-category');
    await expect(screen.findByTestId('0-ingredient-name-and-measure'));
    await screen.findByTestId('1-ingredient-step');
    await screen.findByTestId('2-ingredient-step');
    await screen.findByTestId('3-ingredient-step');
    await screen.findByTestId('4-ingredient-step');
    await screen.findByTestId('share-btn');
    await screen.findByTestId('favorite-btn');

    expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();
  });

  test('4 - verifica como fica a relação do clique nos checkboxes', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('inProgressRecipes', JSON.stringify(StorageObject));

    history.push(RecipeInProgressPath);

    expect(history.location.pathname).toBe(RecipeInProgressPath);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(
      StorageObject,
    );

    const checkboxes = await screen.findAllByRole('checkbox');

    expect(checkboxes.length).toBe(2 * 2 * 2 + 2 * 2 + 1);
    expect(checkboxes[0].checked).toBeTruthy();
    expect(checkboxes[1].checked).toBeTruthy();
    expect(checkboxes[2].checked).toBeTruthy();
    expect(checkboxes[3].checked).not.toBeTruthy();

    act(() => {
      userEvent.click(checkboxes[3]);
    });

    expect(checkboxes[3].checked).toBeTruthy();

    act(() => {
      userEvent.click(checkboxes[3]);
      userEvent.click(checkboxes[4]);
      userEvent.click(checkboxes[5]);
      userEvent.click(checkboxes[6]);
    });

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(
      StorageObjectAtt,
    );

    expect(screen.getByTestId(BotaoFinalizar)).toBeDisabled();

    act(() => {
      userEvent.click(checkboxes[7]);
      userEvent.click(checkboxes[8]);
      userEvent.click(checkboxes[9]);
      userEvent.click(checkboxes[10]);
      userEvent.click(checkboxes[11]);
      userEvent.click(checkboxes[12]);
    });

    expect(screen.getByTestId(BotaoFinalizar)).not.toBeDisabled();

    userEvent.click(screen.getByTestId(BotaoFinalizar));

    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
