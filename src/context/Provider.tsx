import React, { useEffect, useState } from 'react';
import { DrinkObject, FoodObject } from '../interfaces';
import { getCategorylist } from '../services/getDrink';
import { getCategorylist as getFoodCategories } from '../services/getFood';
import MyContext from './MyContext';

interface ProviderProps {
  children: React.ReactNode;
}

interface categoriesProps {
  category: string,
}

function Provider({ children }: ProviderProps) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [respostaDrink, setRespostaDrink] = useState([] as DrinkObject[]);
  const [respostaFood, setRespostaFood] = useState([] as FoodObject[]);
  const [ingredient, setIngredient] = useState<string>('');
  const [foodCategories, setFoodCategories] = useState([] as categoriesProps[]);
  const [drinkCategories, setDrinkCategories] = useState([] as categoriesProps[]);

  const context = {
    login,
    setLogin,
    respostaDrink,
    setRespostaDrink,
    respostaFood,
    setRespostaFood,
    ingredient,
    setIngredient,
    foodCategories,
    drinkCategories,
  };

  useEffect(() => {
    const categoryAPI = async () => {
      setDrinkCategories(await getFoodCategories());
      setFoodCategories(await getCategorylist());
    };
    categoryAPI();
    
  }, [])

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
