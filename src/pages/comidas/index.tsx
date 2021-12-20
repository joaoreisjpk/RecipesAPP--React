/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import HeaderWithSearchIcon from '../../components/HeaderWithSearchIcon';
import MyContext from '../../context/MyContext';
import Cards from '../../components/Cards';
import { foodAPI, getCategorylist, foodSmallAPi } from '../../services/getFood';
import Footer from '../../components/Footer';

import styles from './main.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface innerTextProps extends EventTarget {
  innerText: string;
}

interface handleClickProps extends React.MouseEvent<HTMLButtonElement> {
  target: innerTextProps;
}

function Foods() {
  const { respostaFood, setRespostaFood } = useContext(MyContext);
  const { ingredient } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const { push } = useRouter();
  const TRINTA = 30;

  useEffect(() => {
    const callAPI = async () => {
      if (ingredient) {
        setSelectCategory('Ingrediente');
        setRespostaFood(await foodSmallAPi(`/filter.php?i=${ingredient}`));
      } else setRespostaFood(await foodAPI('/search.php?s='));
    };
    const categoryAPI = async () => setCategories(await getCategorylist());

    callAPI();
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { innerText } }: handleClickProps) => {
    if (innerText === selectCategory || innerText === 'All') {
      setRespostaFood(await foodAPI('/search.php?s='));
      setSelectCategory('');
    } else {
      setSelectCategory(innerText);
      setRespostaFood(await foodSmallAPi(`/filter.php?c=${innerText}`));
    }
  };

  const fetchCategories = (): JSX.Element => {
    const allCategories = [{ category: 'All' }, ...categories];
    return (
      <section className={styles.categorias}>
        <div>
          {!!categories.length ? (
            allCategories
              .map((item, index) => (
                <button
                  key={index}
                  data-testid={`${item.category}-category-filter`}
                  type='button'
                  onClick={handleClick}
                >
                  {item.category}
                </button>
              ))
              .splice(0, 6)
          ) : (
            <h1>Carregando...</h1>
          )}
        </div>
      </section>
    );
  };

  if (respostaFood && respostaFood.length === 1 && !selectCategory) {
    return push(`/comidas/${respostaFood[0].id}`);
  }

  if (respostaFood === null) {
    global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.'
    );
  }
  return (
    <div className={styles.foodDrinksContainer}>
      <HeaderWithSearchIcon
        title='Foods'
        categories={() => fetchCategories()}
      />
      <main>
        {respostaFood
          .map(({ name, image, id }, index) => (
            <Link key={index} href={`/comidas/${id}`} passHref>
              <Cards key={index} name={name} thumbnail={image} index={index} />
            </Link>
          ))
          .splice(0, TRINTA)}
      </main>
      <Footer />
    </div>
  );
}

export default Foods;
