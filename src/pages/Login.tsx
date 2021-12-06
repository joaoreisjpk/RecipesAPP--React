import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import MyContext from '../context/MyContext';
import '../App.css';
import { InputHTMLAttributes } from 'react-router/node_modules/@types/react';


interface innerTextProps extends EventTarget {
  name: string;
  value: string;
}

interface handleLoginProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  target: innerTextProps;
}


function Login() {
  const { login, setLogin } = useContext(MyContext);

  function handleLogin({ target: { name, value } }: handleLoginProps) {
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
    <section className="loginScreen">
      <div className="meals">
        <span className="logo">LOGIN</span>
        <label>E-mail</label>
        <input
          placeholder="Email"
          type="email"
          data-testid="email-input"
          id="email-input"
          name="email"
          value={ login.email }
          onChange={ handleLogin }
        />
        <label>Senha</label>
        <input
          placeholder="Password"
          type="password"
          data-testid="password-input"
          id="password-input"
          name="password"
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
