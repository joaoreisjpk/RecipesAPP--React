import {
  getDrinkPrimeiraletra,
  getDrinkIngrediente,
  getDrinkNome,
  getCategorylist,
  getDrinksCategory,
  getDrinksID,
  getRandomDrink,
  getIngredientList,
} from '../services/getDrink';

import {
  fetchCategoryList,
  resultCategoryList,
} from './mocks/Drinks/mockGetCategoryList';
import {
  fetchGetCategory,
  resultGetCategory,
} from './mocks/Drinks/mockGetCategory';
import fetchGetIngredientsList from './mocks/Drinks/mockGetIngredientsList';
import fetchRandomDrink from './mocks/Drinks/mockFetchRandomDrink';
import fetchGetDrinkID from './mocks/Drinks/mockGetByID';
import fetchGetByName from './mocks/Drinks/mockGetByName';
import mockItensFilterByFirstLetter from './mocks/Drinks/mockGetByFirstLetter';
import {
  mockGetByIngridients,
  resultsGetByIngredients,
} from './mocks/Drinks/mockGetByIngredients';

const mockFetch = async (url) => ({
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y':
      return mockItensFilterByFirstLetter;
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ice':
      return mockGetByIngridients;
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mango':
      return fetchGetByName;
    case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
      return fetchCategoryList;
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=cocoa':
      return fetchGetCategory;
    case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12730':
      return fetchGetDrinkID;
    case 'https://www.thecocktaildb.com/api/json/v1/1/random.php':
      return fetchRandomDrink;
    case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list':
      return fetchGetIngredientsList;
    default:
      return { meals: null };
    }
  },
});

describe('Testa as APIs do getFood', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('1 - Testa se getIngrediente funciona devidamente', () => {
    expect(getDrinkIngrediente('ice')).resolves.toEqual(
      resultsGetByIngredients.drinks,
    );
  });

  test('2 - Testa se o getPrimeiraLetra funciona devidamente', () => {
    expect(getDrinkPrimeiraletra('y')).resolves.toEqual(
      mockItensFilterByFirstLetter.drinks,
    );
  });

  test('3 - Testa se o getDrinkNome funciona devidamente', () => {
    expect(getDrinkNome('mango')).resolves.toEqual(fetchGetByName.drinks);
  });

  test(`4 - Testa se o fetchNome retorna uma
  array vazia caso nada seja encontrado`, async () => {
    const fetchAPI = await getDrinkNome('Xablau');
    expect(fetchAPI).toEqual([]);
  });

  test('5 - Testa se o getCategorylist funciona devidamente', async () => {
    const fetchAPI = await getCategorylist();
    expect(fetchAPI).toEqual(resultCategoryList.drinks);
  });
  test('6 - Testa se o getDrinksCategory funciona devidamente', async () => {
    const fetchAPI = await getDrinksCategory('cocoa');
    expect(fetchAPI).toEqual(resultGetCategory.drinks);
  });
  test('7 - Testa se o getDrinksID funciona devidamente', async () => {
    const fetchAPI = await getDrinksID('12730');
    expect(fetchAPI).toEqual(fetchGetDrinkID.drinks[0]);
  });
  test('8 - Testa se o getRandomDrink funciona devidamente', async () => {
    const fetchAPI = await getRandomDrink();
    expect(fetchAPI).toEqual('12768');
  });
  test('9 - Testa se o getIngredientList funciona devidamente', async () => {
    const fetchAPI = await getIngredientList();
    expect(fetchAPI).toEqual(fetchGetIngredientsList.drinks);
  });
});
