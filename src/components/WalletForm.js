import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  addExpenses,
  cancelEditExpense,
  fetchApi,
  saveEditedExpense,
} from '../redux/actions';
import '../styles/WalletForm.css';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  componentDidUpdate(prevProps) {
    const { editor, expenseToEdit } = this.props;

    if (!editor || !expenseToEdit) {
      return;
    }

    const shouldLoadExpense = prevProps.editor !== editor
      || prevProps.expenseToEdit !== expenseToEdit;

    if (shouldLoadExpense) {
      const { id, value, description, currency, method, tag } = expenseToEdit;

      this.setState({
        id,
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  }

  handleSubmit = async (event) => {
    const { dispatch, editor } = this.props;

    event.preventDefault();

    if (editor) {
      await dispatch(saveEditedExpense(this.state));
      this.resetForm();
      return;
    }

    await dispatch(addExpenses(this.state));
    this.resetForm();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCancelEdit = () => {
    const { dispatch } = this.props;

    dispatch(cancelEditExpense());
    this.resetForm();
  };

  resetForm = () => {
    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const currencyOptions = currencies.map((element, index) => (
      <option value={ element } key={ index }>{element}</option>
    ));
    const formTitle = editor ? 'Editar despesa' : 'Nova despesa';
    const formDescription = editor
      ? 'Atualize os campos abaixo e salve as alteracoes da despesa selecionada.'
      : 'Preencha os dados para registrar um novo gasto na sua carteira.';
    const submitLabel = editor ? 'Salvar alteracoes' : 'Adicionar despesa';

    return (
      <form className="WalletForm" onSubmit={ this.handleSubmit }>
        <div className="WalletForm-header">
          <h2>{formTitle}</h2>
          <p>{formDescription}</p>
        </div>
        <div className="input-container">
          <div className="WalletForm-field">
            <span>Preco</span>
            <input
              aria-label="Preco"
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              placeholder="0.00"
              step="0.01"
              onChange={ this.handleChange }
            />
          </div>
          <div className="WalletForm-field">
            <span>Descricao</span>
            <input
              aria-label="Descricao"
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              placeholder="Ex.: almoco com cliente"
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className="WalletForm-selects">
          <div className="WalletForm-field">
            <span>Moeda</span>
            <select
              aria-label="Moeda"
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencyOptions}
            </select>
          </div>
          <div className="WalletForm-field">
            <span>Metodo</span>
            <select
              aria-label="Metodo"
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
          <div className="WalletForm-field">
            <span>Categoria</span>
            <select
              aria-label="Categoria"
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </div>
        </div>
        <div className="WalletForm-actions">
          <button
            type="submit"
            className="add-expense-button"
          >
            {submitLabel}
          </button>
          {editor && (
            <button
              type="button"
              className="WalletForm-cancel-button"
              onClick={ this.handleCancelEdit }
            >
              Cancelar edicao
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  expenseToEdit: wallet.expenses.find((element) => element.id === wallet.idToEdit),
});

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  editor: propTypes.bool.isRequired,
  expenseToEdit: propTypes.shape({
    id: propTypes.number,
    value: propTypes.string,
    description: propTypes.string,
    currency: propTypes.string,
    method: propTypes.string,
    tag: propTypes.string,
  }),
};

WalletForm.defaultProps = {
  expenseToEdit: null,
};

export default connect(mapStateToProps)(WalletForm);
