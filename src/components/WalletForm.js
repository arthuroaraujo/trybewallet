import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    method: 'Dinheiro',
    categorie: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currency, method, categorie } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            type="number"
            name="despesas"
          />
          <input
            data-testid="description-input"
            type="string"
            name="descrição"
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            Qual Moeda

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

export default WalletForm;
