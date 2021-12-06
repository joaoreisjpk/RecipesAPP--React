import { createContext } from 'react';
import { DrinkObject, FoodObject } from '../interfaces';

interface contextProvider {
  login: {
    email: string;
    password: string;
  };

  setLogin: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
  }>>;

  respostaDrink: DrinkObject[];
  setRespostaDrink: React.Dispatch<React.SetStateAction<DrinkObject[]>>;

  respostaFood: FoodObject[];
  setRespostaFood: React.Dispatch<React.SetStateAction<FoodObject[]>>;

  ingredient: string;
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext({} as contextProvider);

export default MyContext;
