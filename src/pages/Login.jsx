import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import MyContext from '../context/MyContext';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const { login, setLogin } = useContext(MyContext);

  function handleLogin({ target: { name, value } }) {
    setLogin({ ...login, [name]: value });
  }

  function verifyEmail() {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(login.email);
  }

  function verifyPassword() {
    const MINIMUM_PASSWORD = 6;
    return login.password.length > MINIMUM_PASSWORD;
  }

  function verifyLogin() {
    return (verifyEmail() && verifyPassword());
  }

  function saveTokens() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }

  function saveUser() {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
  }

  function createMealsAndCocktailsKeysInLocalStorage() {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  function handleClick() {
    saveTokens();
    saveUser();
    createMealsAndCocktailsKeysInLocalStorage();
  }

  return (
    <section>
      <div className="meals">
        <form>
          <Input
            placeholder="Digite seu e-mail"
            type="email"
            dataID="email-input"
            label="E-mail"
            id="email-input"
            name="email"
            value={ login.email }
            onChange={ handleLogin }
          />
          <Input
            placeholder="Digite sua senha"
            type="password"
            dataID="password-input"
            label="Senha"
            id="password-input"
            name="password"
            onChange={ handleLogin }
            value={ login.password }
          />
          <Link to="/comidas">
            <Button
              text="Entrar"
              dataID="login-submit-btn"
              disabled={ !verifyLogin() }
              onClick={ handleClick }
            />
          </Link>
        </form>
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </section>
  );
}

export default Login;
