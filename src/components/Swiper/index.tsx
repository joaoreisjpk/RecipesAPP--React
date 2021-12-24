import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* import './styles.css'; */

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper';
import { DrinkObject, FoodObject } from '../../interfaces';
import RecommendationCard from '../CardDetail/RecommendationCard';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

interface RecommendationCardProps {
  itemList: FoodObject[] | DrinkObject[];
}

import styles from './main.module.scss';

export function Main({ itemList }: RecommendationCardProps) {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      className={styles.mySwiper}
    >
      {itemList
        .map((item, index) => (
          <SwiperSlide key={item.id}>
            <RecommendationCard key={item} recipe={item} index={index} />
          </SwiperSlide>
        ))
        .slice(0, 6)}
    </Swiper>
  );
}
