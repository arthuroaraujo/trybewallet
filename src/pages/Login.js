import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getEmail } from '../redux/actions';

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
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
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
