import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getIngredientList } from '../services/getFood';

function ExploreFoodsIngredients() {
  const { setIngredient, setRespostaFood } = useContext(MyContext);
  const [ingredientList, setIngredientList] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    const fetchAPI = async () => {
      setRespostaFood([]);
      setIngredientList(await getIngredientList());
    };
    fetchAPI();
  }, [setRespostaFood]);

  const handleIngredient = (param) => {
    console.log('clicado');
    setIngredient(param);
  };

  return (
    <>
      <Header title="Explorar Ingredientes" />
      { ingredientList.splice(0, DOZE).map(({ strIngredient }, index) => (
        <Link to="/comidas/" key={ index }>
          <button type="button" onClick={ () => handleIngredient(strIngredient) }>
            <div data-testid={ `${index}-ingredient-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strIngredient}</h2>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
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
