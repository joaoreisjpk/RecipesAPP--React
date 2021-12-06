/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../components/HeaderWithSearchIcon';
import MyContext from '../context/MyContext';
import Cards from '../components/Cards';
import {
  drinkAPI,
  getCategorylist,
  drinkSmallAPI,
} from '../services/getDrink';
import Footer from '../components/Footer';

interface innerTextProps extends EventTarget {
  innerText: string;
}

interface handleClickProps extends React.MouseEvent<HTMLButtonElement> {
  target: innerTextProps;
}

function Drinks() {
  const { respostaDrink, setRespostaDrink } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const DOZE = 12;
  const SIX = 6;

  useEffect(() => {
    const callAPI = async () => {
      if (ingredient) {
        setSelectCategory('Ingrediente');
        setRespostaDrink(await drinkSmallAPI(`/filter.php?i=${ingredient}`));
      } else setRespostaDrink(await drinkAPI('/search.php?s='));
    };
    const categoryAPI = async () => setCategories(await getCategorylist());

    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }: handleClickProps) => {
    if (innerText === selectCategory || innerText === 'All') {
      setRespostaDrink(await drinkAPI('/search.php?s='));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaDrink(await drinkSmallAPI(`/filter.php?c=${innerText}`));
    }
  };

  const fetchCategories = () => {
    const allCategories = [{ category: 'All' }, ...categories];
    return allCategories.map((item, index) => (
      <button
        key={ index }
        data-testid={ `${item.category}-category-filter` }
        type="button"
        onClick={ handleClick }
      >
        {item.category}
      </button>
    )).splice(0, SIX);
  };

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].id}` } />;
  }

  return (
    <div>
      <HeaderWithSearchIcon title="Bebidas" />
      { categories && fetchCategories() }
      <div id="card-container">
        { respostaDrink && respostaDrink
          .map(({ name, image, id }, index) => (
            <Link key={ index } to={ `/bebidas/${id}` }>
              <Cards
                key={ index }
                name={ name }
                thumbnail={ image }
                index={ index }
              />
            </Link>
          )).splice(0, DOZE)}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
