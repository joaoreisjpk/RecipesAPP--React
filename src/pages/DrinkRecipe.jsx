/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDrinksID } from '../services/getDrink';
import { getNome } from '../services/getFood';
import CardDetail from '../components/CardDetail';

function DrinkRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState();
  const { idDrink } = useParams();

  useEffect(() => {
    const callAPI = async () => {
      setItemDetail(await getDrinksID(idDrink));
    };
    const callRecomendation = async () => setItemRecomendation(await getNome(''));
    callAPI();
    callRecomendation();
  }, []);

  console.log(itemRecomendation);
  if (!itemDetail) return <span>Carregando...</span>;
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        srcImg={ itemDetail.strDrinkThumb }
        title={ itemDetail.strDrink }
        instructions={ itemDetail.strInstructions }
        category={ itemDetail.strAlcoholic }
        itemRecomendation={ itemRecomendation }
      />
      <Link to={ `/bebidas/${idDrink}/in-progress` }>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </Link>
    </div>
  );
}

export default DrinkRecipe;
