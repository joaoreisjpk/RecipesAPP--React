/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import HeaderWithSearchIcon from '../../components/HeaderWithSearchIcon';
import MyContext from '../../context/MyContext';
import Cards from '../../components/Cards';
import { drinkAPI, getCategorylist, drinkSmallAPI } from '../../services/getDrink';
import Footer from '../../components/Footer';

import './main.scss';

interface innerTextProps extends EventTarget {
  name: string;
}

interface handleClickProps extends React.MouseEvent<HTMLButtonElement> {
  target: innerTextProps;
}

function Drinks() {
  const { respostaDrink, setRespostaDrink } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const TRINTA = 30;

  function reName(name: string): string {
    if (name === 'Ordinary Drink') {
      return 'Ordinary';
    } else if (name.includes('Milk')) {
      return 'Milk';
    } else if (name.includes('Other')) {
      return 'Other';
    }
    return name;
  }

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

  const handleClick = async ({ target: { name } }: handleClickProps) => {
    if (name === selectCategory || name === 'All') {
      setRespostaDrink(await drinkAPI('/search.php?s='));
      setSelectCategory('');
    } else {
      setSelectCategory(name);
      setRespostaDrink(await drinkSmallAPI(`/filter.php?c=${name}`));
    }
  };

  const fetchCategories = () => {
    const allCategories = [{ category: 'All' }, ...categories];
    return (
      <section className='categorias'>
        <div>
          {!!categories.length ? (
            allCategories
              .map((item, index) => {
                const name = reName(item.category);
                return (
                  <button
                    key={index}
                    data-testid={`${item.category}-category-filter`}
                    type='button'
                    name={item.category}
                    onClick={handleClick}
                  >
                    {name}
                  </button>
                );
              })
              .splice(0, 6)
          ) : (
            <h1>Carregando...</h1>
          )}
        </div>
      </section>
    );
  };

  if (respostaDrink && respostaDrink.length === 1) {
    return <Redirect to={`/bebidas/${respostaDrink[0].id}`} />;
  }

  return (
    <div className='foodDrinksContainer'>
      <HeaderWithSearchIcon
        title='Bebidas'
        categories={() => fetchCategories()}
      />
      <main>
        {respostaDrink
          .map(({ name, image, id }, index) => (
            <Link key={index} to={`/bebidas/${id}`}>
              <Cards key={index} name={name} thumbnail={image} index={index} />
            </Link>
          ))
          .splice(0, TRINTA)}
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
