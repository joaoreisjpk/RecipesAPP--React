import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import profileIcon from '../../images/profileIcon.svg';

import styles from './main.module.scss';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav>
        <Link href='/perfil' passHref>
          <button>
            <Image
              id='profile-top-btn'
              src={profileIcon}
              data-testid='profile-top-btn'
              alt='Profile Icon'
            />
          </button>
        </Link>
        <h1 data-testid='page-title'>{title}</h1>
      </nav>
    </header>
  );
}

export default Header;
