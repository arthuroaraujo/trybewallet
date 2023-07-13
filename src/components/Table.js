import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className="Table">
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
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>{ element.description }</td>
              <td>{ element.tag }</td>
              <td>{ element.method }</td>
              <td>{ Number(element.value).toFixed(2) }</td>
              <td>{ element.exchangeRates[element.currency].name }</td>
              <td>
                { Number(element.exchangeRates[element.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                { Number((element.exchangeRates[element.currency].ask * element.value)
                  .toFixed(2))}
              </td>
              <td>Real</td>
              <td>

                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpenses(element.id)) }
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
