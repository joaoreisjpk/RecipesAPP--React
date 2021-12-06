import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import { getAreaList, foodSmallAPi, foodAPI } from '../services/getFood';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const DOZE = 12;

  useEffect(() => {
    const callAPI = async () => {
      setAreas(await getAreaList());
      setFoodList(await foodAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  const handleChange = async (param) => {
    if (param === 'All') return setFoodList(await foodAPI('/search.php?s='));
    setFoodList(await foodSmallAPi(`/filter.php?a=${param}`));
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
      { areas.map(({ area }, index) => (
        <option
          key={ index }
          value={ area }
          data-testid={ `${area}-option` }
        >
          { area }
        </option>
      ))}
    </select>
  );

  return (
    <>
      <HeaderWithSearchIcon title="Explorar Origem" />
      <Footer />

      {fetchAreaSelection()}

      { foodList.map(({ name, image, id }, index) => (
        <Link key={ index } to={ `/comidas/${id}` }>
          <Cards
            key={ index }
            name={ name }
            thumbnail={ image }
            index={ index }
          />
        </Link>
      )).splice(0, DOZE)}
    </>
  );
}

export default ExploreFoodsArea;
