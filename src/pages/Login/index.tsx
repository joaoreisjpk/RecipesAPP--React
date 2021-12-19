import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import { InputHTMLAttributes } from 'react-router/node_modules/@types/react';

import './main.scss';

interface innerTextProps extends EventTarget {
  id: string;
  value: string;
}

interface handleLoginProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  target: innerTextProps;
}


function Login() {
  const { login, setLogin } = useContext(MyContext);

  function handleLogin({ target: { id, value } }: handleLoginProps) {
    setLogin({ ...login, [id]: value });
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
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }

  function saveUser() {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
  }

  function handleClick() {
    saveTokens();
    saveUser();
  }

  return (
    <section className="loginContainer">
      <div>
        <span>LOGIN</span>
        <div>
          <label>
            E-mail
            <input
              placeholder="email@exemplo.com"
              type="email"
              data-testid="email-input"
              id="email"
              value={ login.email }
              onChange={ handleLogin }
            />
          </label>
          <label>
            Senha
            <input
              placeholder="senha"
              type="password"
              data-testid="password-input"
              id="password"
              value={ login.password }
              onChange={ handleLogin }
            />
          </label>
        </div>
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            disabled={ !verifyLogin() }
            onClick={ handleClick }
          >Entrar</button>
        </Link>
      </div>
    </section>
  );
}

export default Login;
