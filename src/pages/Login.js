import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getEmail } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyButton());
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  verifyButton = () => {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const verifyEmail = emailRegex.test(email);
    const number = 6;
    const verifyPassword = password.length >= number;
    this.setState({ isDisabled: !(verifyEmail && verifyPassword) });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="Login">
        <div className="Login-container">
          <div className="Login-branding">
            <span className="Login-badge">TrybeWallet</span>
            <h1>Controle sua vida financeira sem complicacao</h1>
            <p>
              Organize gastos, acompanhe conversoes e visualize tudo em um
              painel mais claro.
            </p>
          </div>
          <form onSubmit={ this.handleClick }>
            <label htmlFor="email" className="Login-field">
              <span>Email</span>
              <input
                id="email"
                data-testid="email-input"
                type="email"
                name="email"
                value={ email }
                placeholder="voce@exemplo.com"
                autoComplete="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password" className="Login-field">
              <span>Senha</span>
              <input
                id="password"
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                placeholder="Minimo de 6 caracteres"
                autoComplete="current-password"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Login);
