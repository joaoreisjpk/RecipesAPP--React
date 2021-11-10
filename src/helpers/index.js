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
