import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import { fetchGetCategory } from './mocks/Foods/mockGetCategory';
import { fetchGetCategory as fetchDrinkCategory } from './mocks/Drinks/mockGetCategory';
import { fetchCategoryList } from './mocks/Foods/mockGetCategoryList';
import mockDrinks from './mocks/Drinks/mockDrinks';
import {
  fetchCategoryList as fetchDinkCategoryList } from './mocks/Drinks/mockGetCategoryList';
import MockData from './mocks/NameMeatMock';

const mockDrinkFetch = async (url) => ({
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
      return mockDrinks;
    case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
      return fetchDinkCategoryList;
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=undefined':
      return fetchDrinkCategory;
    default:
      return { meals: null };
    }
  },
});

const mockMealsFetch = async (url) => ({
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
      return MockData;
    case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
      return fetchCategoryList;
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=undefined':
      return fetchGetCategory;
    default:
      return { meals: null };
    }
  },
});

const zeroImg = '0-card-img';
const zeroCard = '0-recipe-card';
const zeroName = '0-card-name';

describe('Testa os botões de filtrar por categoria', () => {
  test('25.1 - Testa os cards caso tenha mais de uma comida', async () => {
    global.fetch = jest.fn(mockMealsFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await screen.findByTestId(zeroCard);
    screen.getByTestId(zeroImg);
    screen.getByTestId(zeroName);

    screen.getByTestId('1-recipe-card');
    screen.getByTestId('1-card-img');
    screen.getByTestId('1-card-name');

    screen.getByTestId('5-recipe-card');
    screen.getByTestId('5-card-img');
    screen.getByTestId('5-card-name');

    expect(screen.queryByTestId('13-recipe-card')).toBeNull();
    expect(screen.queryByTestId('13-card-img')).toBeNull();
    expect(screen.queryByTestId('12-card-name')).toBeNull();
  });

  test('25.2 - Testa os cards caso tenha mais de uma bebida', async () => {
    global.fetch = jest.fn(mockDrinkFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    await screen.findByTestId(zeroCard);
    screen.getByTestId(zeroImg);
    screen.getByTestId(zeroName);

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

  test('26.1 - Verifica se os 12 cards renderizam propriamente', async () => {
    global.fetch = jest.fn(mockMealsFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await screen.findByTestId(zeroCard);
    expect(MockData.meals[0].strMealThumb)
      .toContain(screen.getByTestId(zeroImg).src);
    expect(screen.getByTestId(zeroName).innerHTML).toBe(MockData.meals[0].strMeal);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  test('26.2 - Verifica se os 12 cards renderizam propriamente', async () => {
    global.fetch = jest.fn(mockDrinkFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    await screen.findByTestId(zeroCard);
    expect(mockDrinks.drinks[0].strDrinkThumb)
      .toContain(screen.getByTestId(zeroImg).src);
    expect(screen.getByTestId(zeroName).innerHTML)
      .toBe(mockDrinks.drinks[0].strDrink);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  test('27.1 - Verifica os IDS dos botões', async () => {
    global.fetch = jest.fn(mockMealsFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await screen.findByTestId('All-category-filter');
    await screen.findByTestId('Beef-category-filter');
    screen.getByTestId('Breakfast-category-filter');
    screen.getByTestId('Chicken-category-filter');
    screen.getByTestId('Dessert-category-filter');
    screen.getByTestId('Goat-category-filter');
    expect(screen.queryByTestId('Lamb-category-filter')).toBeNull();

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  test('27.1 - Verifica os IDS dos botões', async () => {
    global.fetch = jest.fn(mockDrinkFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    await screen.findByTestId('All-category-filter');
    await screen.findByTestId('Ordinary Drink-category-filter');
    await screen.findByTestId('Cocktail-category-filter');
    await screen.findByTestId('Milk / Float / Shake-category-filter');
    await screen.findByTestId('Other/Unknown-category-filter');
    await screen.findByTestId('Cocoa-category-filter');
    expect(screen.queryByTestId('Shot-category-filter')).toBeNull();

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  test('28.1 - Verifica o se os botões funcionam devidamente', async () => {
    global.fetch = jest.fn(mockMealsFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await act(async () => {
      userEvent.click(await screen.findByTestId('Beef-category-filter'));
    });

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
    await screen.findByTestId(zeroCard);
    expect(screen.getByTestId(zeroImg).src)
      .toBe(fetchGetCategory.meals[0].strMealThumb);
    expect(screen.getByTestId(zeroName).innerHTML)
      .toBe(fetchGetCategory.drinks[0].strDrink);
    await screen.findByTestId('1-recipe-card');
    expect(screen.getByTestId('1-card-img').src)
      .toBe(fetchGetCategory.meals[1].strMealThumb);
    expect(screen.getByTestId('1-card-name').innerHTML)
      .toBe(fetchGetCategory.drinks[1].strDrink);
    expect(screen.queryByTestId('2-card-img')).toBeNull();
    expect(screen.queryByTestId('2-recipe-card')).toBeNull();
    expect(screen.queryByTestId('2-recipe-name')).toBeNull();
  });

  test('28.2 - Verifica o se os botões funcionam devidamente', async () => {
    global.fetch = jest.fn(mockDrinkFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    await act(async () => {
      userEvent.click(await screen.findByTestId('Cocoa-category-filter'));
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=undefined');

    await screen.findByTestId(zeroCard);
    expect(screen.getByTestId(zeroImg).src)
      .toBe(fetchDrinkCategory.drinks[0].strDrinkThumb);
    expect(screen.getByTestId(zeroName).innerHTML)
      .toBe(fetchDrinkCategory.drinks[0].strDrink);
    await screen.findByTestId('6-recipe-card');
    expect(screen.getByTestId('6-card-img').src)
      .toBe(fetchDrinkCategory.drinks[6].strDrinkThumb);
    expect(screen.getByTestId('6-card-name').innerHTML)
      .toBe(fetchDrinkCategory.drinks[6].strDrink);
    expect(screen.queryByTestId('12-card-img')).toBeNull();
    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-recipe-name')).toBeNull();
  });
});
