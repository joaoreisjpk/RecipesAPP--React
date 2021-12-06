import axios from 'axios';

const renamingLargeNumberOfKeys = (list) => {
  if (!list) {
    global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
    return [];
  }

  const retorno = list.map((item) => {
    const {
      idDrink: id,
      strDrink: name,
      strDrinkThumb: image,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strInstructions: instruction,
      ...rest
    } = item;
    return {
      id,
      name,
      type: 'bebida',
      category,
      alcoholicOrNot,
      image,
      area: '',
      video: '',
      instruction,
      ...rest,
    };
  });

  return retorno;
};

const renamingSmallNumberOfKeys = (list) => {
  if (!list) {
    global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
    return [];
  }
  return list.map(({ idDrink, strDrink, strDrinkThumb }) => ({
    id: idDrink,
    name: strDrink,
    image: strDrinkThumb,
    type: 'bebida',
  }));
};

export const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

export const drinkSmallAPI = async (param) => {
  const response = await api.get(param);

  return renamingSmallNumberOfKeys(response.data.drinks);
};

export const drinkAPI = async (param) => {
  const response = await api.get(param);

  return renamingLargeNumberOfKeys(response.data.drinks);
};

export const getCategorylist = async () => {
  const response = await api.get('/list.php?c=list');

  return response.data.drinks.map(({ strCategory }) => ({ category: strCategory }));
};

export const getRandomDrink = async () => {
  const response = await api.get('/random.php');

  return renamingLargeNumberOfKeys(response.data.drinks)[0].id;
};

export const getIngredientList = async () => {
  const response = await api.get('/list.php?i=list');
  return response.data.drinks;
};
