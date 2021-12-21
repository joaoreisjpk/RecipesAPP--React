import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/MyContext';
import styles from './main.module.scss';
import {
  drinkAPI,
  getCategorylist as drinkCategories,
  drinkSmallAPI,
} from '../../services/getDrink';
import {
  foodAPI,
  getCategorylist as foodCategories,
  foodSmallAPi,
} from '../../services/getFood';

interface innerTextProps extends EventTarget {
  name: string;
}

interface handleClickProps extends React.MouseEvent<HTMLButtonElement> {
  target: innerTextProps;
}

export default function FetchCategories() {
  const { respostaDrink, setRespostaDrink, setRespostaFood } = useContext(MyContext);
  const [selectCategory, setSelectCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const allCategories = [{ category: 'All' }, ...categories];
  const { pathname } = useRouter();

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
    setSelectCategory('Ingrediente');
    const categoryAPI = async () => {
      if (pathname === '/bebidas') {
        setCategories(await drinkCategories());
      }
      else {
        setCategories(await foodCategories());
      }
    };
    categoryAPI();
  }, []);

  const handleClick = async ({ target: { name } }: handleClickProps) => {
    if (name === selectCategory || name === 'All') {
      if (pathname === '/bebidas') 
        setRespostaDrink(await drinkAPI('/search.php?s='));
      else 
        setRespostaFood(await foodAPI('/search.php?s='));
      setSelectCategory('');
    } else {
      setSelectCategory(name);
      if (pathname === '/bebidas')
        setRespostaDrink(await drinkSmallAPI(`/filter.php?c=${name}`));
      else
      setRespostaFood(await foodSmallAPi(`/filter.php?c=${name}`));
    }
  };

  return (
    <section className={styles.categorias}>
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
}
