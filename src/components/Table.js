import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { Number(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                { Number((expense.exchangeRates[expense.currency].ask * expense.value)
                  .toFixed(2))}
              </td>
              <td>Real</td>
              <td>

                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpenses(expense.id)) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf,
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
