const renamingLargeNumberOfKeys = (list) => {
  if (!list) return [];
  return list.map((item) => {
    const { idMeal, strMeal, strMealThumb, strArea } = item;
    const { strCategory, strYoutube, strInstructions } = item;
    return (
      {
        id: idMeal,
        name: strMeal,
        type: 'comida',
        category: strCategory,
        alcoholicOrNot: '',
        image: strMealThumb,
        area: strArea,
        video: strYoutube,
        instruction: strInstructions,
        ...item,
      });
  });
};

const renamingSmallNumberOfKeys = (list) => {
  if (!list) return [];
  return list.map(({ strMeal, idMeal, strMealThumb }) => (
    {
      id: idMeal,
      name: strMeal,
      image: strMealThumb,
      type: 'comida',
    }));
};

const URL_INGREDIENTE = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const getIngrediente = async (param) => {
  const response = await fetch(`${URL_INGREDIENTE}${param}`)
    .then((resolve) => resolve.json());

  return renamingSmallNumberOfKeys(response.meals);
};

const URL_NOME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const getNome = async (param) => {
  const response = await fetch(`${URL_NOME}${param}`)
    .then((resolve) => resolve.json());

  return renamingLargeNumberOfKeys(response.meals);
};

const URL_PRIMEIRALETRA = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const getPrimeiraletra = async (param) => {
  const response = await fetch(`${URL_PRIMEIRALETRA}${param}`)
    .then((resolve) => resolve.json());

  return renamingLargeNumberOfKeys(response.meals);
};

const URL_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const getCategorylist = async () => {
  const response = await fetch(URL_CATEGORY).then((resolve) => resolve.json());

  return response.meals.map(({ strCategory }) => ({ category: strCategory }));
};

const URL_FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export const getFoodCategory = async (param) => {
  const response = await fetch(`${URL_FOOD_CATEGORY}${param}`)
    .then((resolve) => resolve.json());

  return renamingSmallNumberOfKeys(response.meals);
};

const URL_FOOD_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const getFoodById = async (id) => {
  const response = await fetch(`${URL_FOOD_ID}${id}`)
    .then((resolve) => resolve.json());

  return renamingLargeNumberOfKeys(response.meals)[0];
};

const URL_FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const getRandomFood = async () => {
  const response = await fetch(URL_FOOD_RANDOM)
    .then((resolve) => resolve.json());

  return renamingLargeNumberOfKeys(response.meals)[0].idMeal;
};

const URL_INGREDIENTS_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const getIngredientList = async () => {
  const response = await fetch(URL_INGREDIENTS_LIST);
  const resolve = await response.json();
  return resolve.meals;
};

const URL_FOOD_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const getFoodListByArea = async (area) => {
  const response = await fetch(`${URL_FOOD_AREA}${area}`)
    .then((resolve) => resolve.json());

  return renamingSmallNumberOfKeys(response.meals);
};

const URL_AREA_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const getAreaList = async () => {
  const response = await fetch(URL_AREA_LIST);
  const resolve = await response.json();
  return resolve.meals.map(({ strArea }) => ({ area: strArea }));
};
