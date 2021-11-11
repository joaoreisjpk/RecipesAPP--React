const URL_INGREDIENTE = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const getIngrediente = async (param) => {
  const response = await fetch(`${URL_INGREDIENTE}${param}`);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_NOME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const getNome = async (param) => {
  const response = await fetch(`${URL_NOME}${param}`);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_PRIMEIRALETRA = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const getPrimeiraletra = async (param) => {
  const response = await fetch(`${URL_PRIMEIRALETRA}${param}`);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const getCategorylist = async () => {
  const response = await fetch(URL_CATEGORY).then((resolve) => resolve.json());
  return response.meals;
};

const URL_FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export const getFoodCategory = async (param) => {
  const response = await fetch(`${URL_FOOD_CATEGORY}${param}`)
    .then((resolve) => resolve.json());
  return response.meals;
};

const URL_FOOD_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const getFoodById = async (id) => {
  const response = await fetch(`${URL_FOOD_ID}${id}`);
  const resolve = await response.json();
  return resolve.meals[0];
};

const URL_FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const getRandomFood = async () => {
  const response = await fetch(URL_FOOD_RANDOM);
  const resolve = await response.json();
  return resolve.meals[0].idMeal;
};

const URL_INGREDIENTS_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const getIngredientList = async () => {
  const response = await fetch(URL_INGREDIENTS_LIST);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_FOOD_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const getFoodListByArea = async (area) => {
  const response = await fetch(`${URL_FOOD_AREA}${area}`);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_AREA_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const getAreaList = async () => {
  const response = await fetch(URL_AREA_LIST);
  const resolve = await response.json();
  return resolve.meals;
};
