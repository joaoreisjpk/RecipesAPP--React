/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { drinkAPI } from '../services/getDrink';
import { foodAPI } from '../services/getFood';
import CardDetail from '../components/CardDetail';

function DrinkRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState([]);
  const { idDrink } = useParams();

  const keyInProgressRecipesFromLS = () => JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (!keyInProgressRecipesFromLS()) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const callAPI = async () => {
      setItemDetail((await drinkAPI(`/lookup.php?i=${idDrink}`))[0]);
      setItemRecomendation(await foodAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  function handleButtonText() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getStorage && !getStorage.cocktails) return false;
    const drinkKeys = Object.keys(getStorage.cocktails);
    const validate = drinkKeys.some((id) => id === idDrink);
    return validate;
  }

  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        itemRecomendation={ itemRecomendation }
      />
      <Link to={ `/bebidas/${idDrink}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
        >
          {handleButtonText() ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );
}

export default DrinkRecipe;
