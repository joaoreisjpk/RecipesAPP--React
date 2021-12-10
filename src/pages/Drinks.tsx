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

import '../styles/foodDrinksPage.scss';

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
    return (
      <section className="categorias">
        <div>
          { allCategories.map((item, index) => (
            <button
              key={ index }
              data-testid={ `${item.category}-category-filter` }
              type="button"
              onClick={ handleClick }
            >
              {item.category}
            </button>)).splice(0, 3)}
        </div>
        <div>
          { allCategories.map((item, index) => (
            <button
              key={ index }
              data-testid={ `${item.category}-category-filter` }
              type="button"
              onClick={ handleClick }
            >
              {item.category}
            </button>)).splice(3, 3)}
        </div>
      </section>
    );
  };

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={ `/bebidas/${respostaDrink[0].id}` } />;
  }

  return (
    <div className="foodDrinksContainer">
      <HeaderWithSearchIcon title="Bebidas" categories={() => fetchCategories()} />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
