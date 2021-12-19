import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import './main.scss'

function Perfil() {
  let email = '';
  const user = JSON.parse(localStorage.getItem('user') || '');

  if (user) {
    email = user.email;
  }

  return (
    <section className="perfilContainer">
      <Header title="Perfil" />
      <main>
        <div>
          <h1>Usuário:</h1>
          <h2 data-testid="profile-email">{email}</h2>
        </div>
        <Link to="/receitas-feitas">
          <Button dataID="profile-done-btn" text="Receitas Feitas" />
        </Link>
        <Link to="/receitas-favoritas">
          <Button dataID="profile-favorite-btn" text="Receitas Favoritas" />
        </Link>
        <Link to="/">
          <Button
            dataID="profile-logout-btn"
            text="Sair"
            onClick={ () => localStorage.clear() }
          />
        </Link>
      </main>
      <Footer />
    </section>
  );
}

export default Perfil;
