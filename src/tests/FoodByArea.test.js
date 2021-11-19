import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import areas from './mocks/Foods/areas';
import mealIngredients from './mocks/Foods/mealIngredients';

const mockFetch = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: async () => Promise.resolve(mealIngredients),
    }));
};

describe('Testa se a tela Explorar comida funciona devidamente', () => {
  beforeEach(cleanup);

  test('71 a 75 - Checando os ids de cada botão', () => {
    act(() => {
      mockFetch();
    });

    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    userEvent.click(screen.getByTestId('explore-bottom-btn'));

    expect(history.location.pathname).toBe('/explorar');

    userEvent.click(screen.getByTestId('explore-food'));

    expect(history.location.pathname).toBe('/explorar/comidas');

    userEvent.click(screen.getByTestId('explore-by-area'));

    expect(history.location.pathname).toBe('/explorar/comidas/area');

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    userEvent.click(screen.getByTestId('food-bottom-btn'));

    expect(history.location.pathname).toBe('/comidas');

    userEvent.click(screen.getByTestId('explore-bottom-btn'));

    expect(history.location.pathname).toBe('/explorar');

    userEvent.click(screen.getByTestId('explore-food'));

    userEvent.click(screen.getByTestId('explore-by-ingredient'));

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    history.push('/explorar/comidas');

    userEvent.click(screen.getByTestId('explore-surprise'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
  });

  test('75 - Testando a tela de explorar ingredientes', async () => {
    act(() => {
      mockFetch();
    });

    const { history } = renderWithRouter(<App />);
    history.push('explorar/comidas/ingredientes');
    await screen.findByTestId('0-ingredient-card');
    expect(screen.getByTestId('0-card-img').src)
      .toBe('https://www.themealdb.com/images/ingredients/Chicken-Small.png');
    expect(screen.getByTestId('0-card-name').innerHTML)
      .toBe('Chicken');

    expect(screen.getByTestId('2-ingredient-card'));
    expect(screen.getByTestId('2-card-img').src)
      .toBe('https://www.themealdb.com/images/ingredients/Beef-Small.png');
    expect(screen.getByTestId('2-card-name').innerHTML)
      .toBe('Beef');

    screen.getByTestId('6-ingredient-card');
    expect(screen.getByTestId('6-card-img').src)
      .toBe('https://www.themealdb.com/images/ingredients/Asparagus-Small.png');
    expect(screen.getByTestId('6-card-name').innerHTML)
      .toBe('Asparagus');

    userEvent.click(screen.getByTestId('6-ingredient-card'));

    expect(history.location.pathname).toBe('/comidas/');

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    cleanup();
  });
});

const mockFetch2 = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: async () => Promise.resolve(areas),
    }));
};

describe('Testa se a tela Explorar comida funciona devidamente', () => {
  beforeEach(cleanup);

  test('71 a 75 - Checando os ids de cada botão', async () => {
    await act(() => {
      mockFetch2();
    });

    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');

    await screen.findByTestId('All-option');

    await areas.meals.forEach(async (item) => {
      await screen.findByTestId(`${item.strArea}-option`);
    });

    userEvent.selectOptions(screen
      .getByTestId('explore-by-area-dropdown'), 'American');

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
  });
});
