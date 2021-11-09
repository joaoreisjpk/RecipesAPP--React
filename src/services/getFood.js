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
