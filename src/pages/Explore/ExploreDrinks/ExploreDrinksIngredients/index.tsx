import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../../../context/MyContext';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { getIngredientList } from '../../../../services/getDrink';

import './main.scss';

function ExploreDrinksIngredients() {
  const { setIngredient, setRespostaDrink } = useContext(MyContext);
  const [ingredientList, setIngredientList] = useState([]);
  const TRINTA = 30;

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
    <section className="exploreIngContainer">
      <Header title="Explorar Ingredientes" />
      <main>
        {ingredientList.splice(0, TRINTA).map(({ strIngredient1 }, index) => (
          <Link to="/bebidas/" key={ index }>
            <button type="button" onClick={ () => handleIngredient(strIngredient1) }>
              <div data-testid={ `${index}-ingredient-card` }>
                <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </button>
          </Link>
        ))}
      </main>
      <div>''</div>
      <Footer />
    </section>
  );
}

export default ExploreDrinksIngredients;
