export const getIngredients = (object) => {
  const keys = Object.keys(object);
  const arrayIngredients = keys.reduce((array, currentKey) => {
    if (currentKey.includes('strIngredient') && object[currentKey]) {
      array = [...array, object[currentKey]];
    }
    return array;
  }, []);
  return arrayIngredients;
};

export const getMeasures = (object) => {
  const keys = Object.keys(object);
  const arrayMeasures = keys.reduce((array, currentKey) => {
    if (currentKey.includes('strMeasure') && object[currentKey]) {
      array = [...array, object[currentKey]];
    }
    return array;
  }, []);
  return arrayMeasures;
};

export const getFavoriteList = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

export const setFavoriteList = (item) => (
  localStorage.setItem('favoriteRecipes', JSON.stringify(item))
);

export const isFavorite = (id) => {
  if (getFavoriteList()) {
    return getFavoriteList().some((item) => item.id === id);
  }
  setFavoriteList([]);
  return false;
};

export const handleFavorite = (object) => {
  const { idDrink, strArea, type, strAlcoholic, strDrink, strDrinkThumb } = object;
  const { idMeal, strCategory, strMeal, strMealThumb } = object;
  const { id: itemID, area, category, name, image, alcoholicOrNot } = object;

  const id = idMeal || idDrink || itemID;

  if (isFavorite(id)) {
    const list = getFavoriteList()
      .filter((item) => item.id !== id);

    setFavoriteList(list);
  } else {
    const list = {
      id,
      type,
      area: strArea || area || '',
      category: strCategory || category,
      alcoholicOrNot: strAlcoholic || alcoholicOrNot || '',
      name: strDrink || name || strMeal,
      image: strDrinkThumb || image || strMealThumb,
    };
    setFavoriteList([...getFavoriteList(), list]);
  }
};
