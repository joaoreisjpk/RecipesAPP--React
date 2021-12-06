import axios from 'axios';
import { FoodAPIProps, FoodObject } from '../interfaces';

export const renamingLargeNumberOfKeys = (list: FoodAPIProps[]): FoodObject[] => {
  if (!list) {
    global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
    return [];
  }
  const retorno = list.map((item) => {
    const {
      idMeal: id,
      strMeal: name,
      strMealThumb: image,
      strArea: area,
      strCategory: category,
      strYoutube: video,
      strInstructions: instruction,
      ...rest
    } = item;
    return {
      id,
      name,
      type: 'comida',
      category,
      alcoholicOrNot: '',
      image,
      area,
      video,
      instruction,
      ...rest,
    };
  });
  return retorno;
};

const renamingSmallNumberOfKeys = (list: FoodAPIProps[]): FoodObject[] => {
  if (!list) {
    global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
    return [];
  }
  return list.map(({ strMeal, idMeal, strMealThumb }) => ({
    id: idMeal,
    name: strMeal,
    image: strMealThumb,
    type: 'comida',
  }));
};

export const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export const foodSmallAPi = async (param: string) => {
  const response = await api.get(param);

  return renamingSmallNumberOfKeys(response.data.meals);
};

export const foodAPI = async (param: string) => {
  const response = await api.get(param);
  return renamingLargeNumberOfKeys(response.data.meals);
};

export const getCategorylist = async () => {
  const response = await api('/list.php?c=list');

  return response.data.meals.map(({ strCategory }: { strCategory:string}) => ({
    category: strCategory,
  }));
};

export const getRandomFood = async () => {
  const response = await api('/random.php');

  console.log(response);

  return renamingLargeNumberOfKeys(response.data.meals)[0].id;
};

export const getIngredientList = async () => {
  const response = await api('/list.php?i=list');

  return response.data.meals;
};

export const getAreaList = async () => {
  const response = await api('/list.php?a=list');

  return response.data.meals.map(({ strArea }: { strArea: string}) => ({ area: strArea }));
};
