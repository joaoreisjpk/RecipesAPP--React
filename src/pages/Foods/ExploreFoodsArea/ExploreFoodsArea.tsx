import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Footer from '../../../components/Footer';
import HeaderWithSearchIcon from '../../../components/HeaderWithSearchIcon';
import { FoodObject } from '../../../interfaces';
import { getAreaList, foodSmallAPi, foodAPI } from '../../../services/getFood';

import './main.scss';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [foodList, setFoodList] = useState([] as FoodObject[]);

  const TRINTA = 30;

  useEffect(() => {
    const callAPI = async () => {
      setAreas(await getAreaList());
      setFoodList(await foodAPI('/search.php?s='));
    };
    callAPI();
  }, []);

  const handleChange = async (param: string) => {
    if (param === 'All') return setFoodList(await foodAPI('/search.php?s='));
    setFoodList(await foodSmallAPi(`/filter.php?a=${param}`));
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
    <section className="foodsAreaContainer">
      <HeaderWithSearchIcon title="Explorar Origem" />
      <div>
        <span>Região/País:</span>
        {fetchAreaSelection()}
      </div>
      <main>
        { foodList.map(({ name, image, id }, index) => (
          <Link key={ index } to={ `/comidas/${id}` }>
            <Cards
              key={ index }
              name={ name }
              thumbnail={ image }
              index={ index }
            />
          </Link>
        )).splice(0, TRINTA)}
      </main>
      <Footer />
    </section>
  );
}

export default ExploreFoodsArea;
