const URL_INGREDIENTE = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export const getDrinkIngrediente = async (param) => {
  const response = await fetch(`${URL_INGREDIENTE}${param}`);
  const resolve = await response.json();
  return resolve.drinks;
};

const URL_NOME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getDrinkNome = async (param) => {
  const response = await fetch(`${URL_NOME}${param}`);
  const resolve = await response.json();
  return resolve.drinks;
};

const URL_PRIMEIRALETRA = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const getDrinkPrimeiraletra = async (param) => {
  const response = await fetch(`${URL_PRIMEIRALETRA}${param}`);
  const resolve = await response.json();
  return resolve.drinks;
};

const URL_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const getCategorylist = async () => {
  const response = await fetch(URL_CATEGORIES);
  const resolve = await response.json();
  return resolve.drinks;
};

const URL_DRINK_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getDrinksCategory = async (param) => {
  const response = await fetch(`${URL_DRINK_CATEGORY}${param}`)
    .then((resolve) => resolve.json());
  return response.drinks;
};
