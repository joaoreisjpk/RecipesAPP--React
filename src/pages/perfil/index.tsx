import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import styles from './main.module.scss';
import Link from 'next/link';

function Perfil() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user') || '{ email: ""}').email);
  }, []);

  return (
    <section className={styles.perfilContainer}>
      <Header title='Perfil' />
      <main>
        <div>
          <h1>Usuário:</h1>
          <h2 data-testid='profile-email'>{email}</h2>
        </div>
        <Link href='/receitas-feitas'>
          <a href='#'>
            <Button dataID='profile-done-btn' text='Receitas Feitas' />
          </a>
        </Link>
        <Link passHref href='/receitas-favoritas'>
          <a href='#'>
            <Button dataID='profile-favorite-btn' text='Receitas Favoritas' />
          </a>
        </Link>
        <Link passHref href='/'>
          <a href="#">
            <Button
              dataID='profile-logout-btn'
              text='Sair'
              onClick={() => localStorage.clear()}
            />
          </a>
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Perfil;
