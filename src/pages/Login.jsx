import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import MyContext from '../context/MyContext';
import '../App.css';

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

  function handleClick() {
    saveTokens();
    saveUser();
  }

  return (
    <section className="loginScreen">
      <div className="meals">
        <span className="logo">LOGIN</span>
        <Input
          label="e-mail"
          placeholder="Email"
          type="email"
          dataID="email-input"
          id="email-input"
          name="email"
          value={ login.email }
          onChange={ handleLogin }
        />
        <Input
          placeholder="Password"
          type="password"
          dataID="password-input"
          id="password-input"
          name="password"
          label="senha"
          value={ login.password }
          onChange={ handleLogin }
        />
        <Link to="/comidas">
          <Button
            text="Entrar"
            dataID="login-submit-btn"
            id="login-submit-btn"
            disabled={ !verifyLogin() }
            onClick={ handleClick }
          />
        </Link>
      </div>
    </section>
  );
}

export default Login;
