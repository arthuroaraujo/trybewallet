import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenses: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    categorie: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { expenses, description, currency, method, categorie } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            type="number"
            name="expenses"
            value={ expenses }
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="string"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              Object.keys(currencies)
                .filter((element) => element !== 'USDT')
                .map((element, index) => (
                  <option key={ index }>{element}</option>
                ))
            }

          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="categorie"
            value={ categorie }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currency,
});

WalletForm.propTypes = {
  dispatch: propTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
