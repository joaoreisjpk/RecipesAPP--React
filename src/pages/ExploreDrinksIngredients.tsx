import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getIngredientList } from '../services/getDrink';

function ExploreFoodsIngredients() {
  const { setIngredient, setRespostaDrink } = useContext(MyContext);
  const [ingredientList, setIngredientList] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    setRespostaDrink([]);
    const fetchAPI = async () => {
      setIngredientList(await getIngredientList());
    };
    fetchAPI();
  }, [setRespostaDrink]);

  const handleIngredient = (param: string) => {
    setIngredient(param);
  };

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {ingredientList.splice(0, DOZE).map(({ strIngredient1 }, index) => (
        <Link to="/bebidas/" key={ index }>
          <button type="button" onClick={ () => handleIngredient(strIngredient1) }>
            <div data-testid={ `${index}-ingredient-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strIngredient1}</h2>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </div>
          </button>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
