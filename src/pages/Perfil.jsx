import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Perfil() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header title="Perfil" />
      <h4 data-testid="profile-email">{email}</h4>
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
      <Footer />
    </>
  );
}

export default Perfil;
