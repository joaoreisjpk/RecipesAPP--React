import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import styles from './main.module.scss';

function Footer(): JSX.Element {
  return (
    <footer data-testid="footer" className={styles.footer}>
      <section id="container">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          id="drinks-bottom-btn"
        >
          <Link href="/bebidas">
            <a href="#">
              <Image src={ drinkIcon } alt="Drink Icon" />
            </a>
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          id="explore-bottom-btn"
        >
          <Link href="/explorar">
            <a href="#">
              <Image src={ exploreIcon } alt="Explore Icon" />
            </a>
          </Link>
        </button>
        <button
          type="button"
          data-testid="food-bottom-btn"
          id="food-bottom-btn"
        >
          <Link href="/comidas">
            <a href="#">
              <Image src={ mealIcon } alt="Meal Icon" />
            </a>
          </Link>
        </button>
      </section>
    </footer>
  );
}

export default Footer;
