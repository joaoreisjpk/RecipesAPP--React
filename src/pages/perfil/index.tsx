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
        <Link passHref href='/receitas-feitas'>
          <Button dataID='profile-done-btn' text='Receitas Feitas' />
        </Link>
        <Link passHref href='/receitas-favoritas'>
          <Button dataID='profile-favorite-btn' text='Receitas Favoritas' />
        </Link>
        <Link passHref href='/'>
          <Button
            dataID='profile-logout-btn'
            text='Sair'
            onClick={() => localStorage.clear()}
          />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Perfil;
