import {
  getPrimeiraletra,
  getIngrediente,
  getNome,
  getCategorylist,
  getFoodCategory,
  getFoodById,
  getRandomFood,
  getIngredientList,
  getFoodListByArea,
  getAreaList,
} from '../services/getFood';

import { fetchCategoryList, resultCategorylist } from './mocks/Foods/mockGetCategoryList';
import { fetchGetCategory, resultGetCategory } from './mocks/Foods/mockGetCategory';
import { fetchAreaList, resultAreaList } from './mocks/mockAreaList';
import { fetchGetFoodByArea, resultGetFoodByArea } from './mocks/mockGetFoodByArea';
import fetchGetIngredientsList from './mocks/mockGetIngredientList';
import fetchRandomFood from './mocks/mochFetchRandomFood';
import fetchGetFoodByID from './mocks/mockGetFoodByID';
import fetchGetByName from './mocks/Foods/fetchGetByName';
import fetchGetByFirstLetter from './mocks/fetchGetByFirstLetter';
import resultFetchGetByIngredients from './mocks/resultFetchGetByIngredients';
import fetchGetByIngredients from './mocks/fetchGetByIngredients';

const URL_INGREDIENTE = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const URL_NOME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_PRIMEIRALETRA = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const mockFetch = async (url) => ({
  ok: true,
  json: async () => {
    switch (url) {
    case `${URL_PRIMEIRALETRA}i`:
      return fetchGetByFirstLetter;
    case `${URL_INGREDIENTE}rice`:
      return fetchGetByIngredients;
    case `${URL_NOME}Corba`:
      return fetchGetByName;
    case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
      return fetchCategoryList;
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=goat':
      return fetchGetCategory;
    case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968':
      return fetchGetFoodByID;
    case 'https://www.themealdb.com/api/json/v1/1/random.php':
      return fetchRandomFood;
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian':
      return fetchGetFoodByArea;
    case 'https://www.themealdb.com/api/json/v1/1/list.php?a=list':
      return fetchAreaList;
    case 'https://www.themealdb.com/api/json/v1/1/list.php?i=list':
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
    expect(getIngrediente('rice'))
      .resolves.toEqual(resultFetchGetByIngredients.meals);
  });

  test('2 - Testa se o getPrimeiraLetra funciona devidamente', () => {
    expect(getPrimeiraletra('a'))
      .resolves.toEqual(fetchGetByFirstLetter.meals);
  });

  test('3 - Testa se o getNome funciona devidamente', () => {
    expect(getNome('Corba'))
      .resolves.toEqual(fetchGetByName.meals);
  });

  test('4 - Testa se o fetchNome retorna uma array vazia caso nada seja encontrado',
    async () => {
      const fetchAPI = await getNome('Xablau');
      expect(fetchAPI).toEqual([]);
    });

  test('5 - Testa se o getCategoryList funciona devidamente', async () => {
    const fetchAPI = await getCategorylist();
    expect(fetchAPI).toEqual(resultCategorylist.meals);
  });
  test('6 - Testa se o getFoodCategory funciona devidamente', async () => {
    const fetchAPI = await getFoodCategory('goat');
    expect(fetchAPI).toEqual(resultGetCategory);
  });
  test('7 - Testa se o getFoodById funciona devidamente', async () => {
    const fetchAPI = await getFoodById('52968');
    expect(fetchAPI).toEqual(fetchGetFoodByID.meals[0]);
  });
  test('8 - Testa se o getRandomFood funciona devidamente', async () => {
    const fetchAPI = await getRandomFood();
    expect(fetchAPI).toEqual('52916');
  });
  test('9 - Testa se o getIngredientList funciona devidamente', async () => {
    const fetchAPI = await getIngredientList();
    expect(fetchAPI).toEqual(fetchGetIngredientsList.meals);
  });
});

describe('Continua os testes das APIs do getFood', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('10 - Testa se o getFoodListByArea funciona devidamente', async () => {
    const fetchAPI = await getAreaList();
    expect(fetchAPI).toEqual(resultAreaList);
  });
  test('11 - Testa se o getAreaList funciona devidamente', async () => {
    const fetchAPI = await getFoodListByArea('Canadian');
    expect(fetchAPI).toEqual(resultGetFoodByArea);
  });
});
