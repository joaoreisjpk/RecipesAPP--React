import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getIngredientList } from '../services/getFood';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/exploreIngredientsPage.scss';

function ExploreFoodsIngredients() {
  const { setIngredient, setRespostaFood } = useContext(MyContext);
  const [ingredientList, setIngredientList] = useState([]);
  const TRINTA = 30;

  useEffect(() => {
    const fetchAPI = async () => {
      setRespostaFood([]);
      setIngredientList(await getIngredientList());
    };
    fetchAPI();
  }, [setRespostaFood]);

  const handleIngredient = (param: string) => {
    setIngredient(param);
  };

  return (
    <section className="exploreIngContainer">
      <Header title="Explorar Ingredientes" />
      <main>
        { ingredientList.splice(0, TRINTA).map(({ strIngredient }, index) => (
          <Link to="/comidas/" key={ index }>
            <button type="button" onClick={ () => handleIngredient(strIngredient) }>
              <div data-testid={ `${index}-ingredient-card` }>
                <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </button>
          </Link>
        ))}
      </main>
      <Footer />
    </section>
  );
}

export default ExploreFoodsIngredients;
