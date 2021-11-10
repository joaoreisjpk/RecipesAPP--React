/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodById } from '../services/getFood';
import { getDrinkNome } from '../services/getDrink';
import CardDetail from '../components/CardDetail';

function FoodRecipe() {
  const [itemDetail, setItemDetail] = useState();
  const [itemRecomendation, setItemRecomendation] = useState();
  const { idMeal } = useParams();

  useEffect(() => {
    const callAPI = async () => {
      setItemDetail(await getFoodById(idMeal));
    };
    const callRecomendation = async () => setItemRecomendation(await getDrinkNome(''));
    callAPI();
    callRecomendation();
  }, []);

  if (!itemDetail) return <span>Carregando...</span>;
  console.log(itemDetail);
  return (
    <div>
      <CardDetail
        object={ itemDetail }
        srcImg={ itemDetail.strMealThumb }
        title={ itemDetail.strMeal }
        category={ itemDetail.strCategory }
        instructions={ itemDetail.strInstructions }
        srcVideo={ itemDetail.strYoutube }
        itemRecomendation={ itemRecomendation }
      />
      <Link to={ `/comidas/${idMeal}/in-progress` }>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </Link>
    </div>
  );
}

export default FoodRecipe;
