import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import { getAreaList, getFoodListByArea, getNome } from '../services/getFood';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const DOZE = 12;

  useEffect(() => {
    const callAPI = async () => {
      setAreas(await getAreaList());
      setFoodList(await getNome(''));
    };
    callAPI();
  }, []);

  const handleChange = async (param) => {
    if (param === 'All') return setFoodList(await getNome(''));
    setFoodList(await getFoodListByArea(param));
    console.log(param);
  };

  const fetchAreaSelection = () => (
    <select
      name=""
      id=""
      data-testid="explore-by-area-dropdown"
      onChange={ (e) => handleChange(e.target.value) }
    >
      <option value="All" data-testid="All-option">All</option>
      { areas.map(({ strArea }, index) => (
        <option
          key={ index }
          value={ strArea }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))}
    </select>
  );

  return (
    <>
      <HeaderWithSearchIcon title="Explorar Origem" />
      <Footer />

      {fetchAreaSelection()}

      { foodList.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link key={ index } to={ `/comidas/${idMeal}` }>
          <Cards
            key={ index }
            name={ strMeal }
            thumbnail={ strMealThumb }
            index={ index }
          />
        </Link>
      )).splice(0, DOZE)}
    </>
  );
}

export default ExploreFoodsArea;
