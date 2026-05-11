import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpenses, startEditExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    const columns = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Ações',
    ];

    return (
      <div className="Table-section">
        <div className="Table-header">
          <div>
            <h2>Historico de despesas</h2>
            <p>Veja cada lancamento convertido para BRL em tempo real.</p>
          </div>
        </div>
        <table className="Table">
          <thead>
            <tr>
              {columns.map((column) => <th key={ column }>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr>
                <td colSpan="9" className="Table-empty-state">
                  Nenhuma despesa cadastrada ainda.
                </td>
              </tr>
            )}
            {expenses.map((element) => (
              <tr key={ element.id }>
                <td>{ element.description }</td>
                <td>{ element.tag }</td>
                <td>{ element.method }</td>
                <td>{ Number(element.value).toFixed(2) }</td>
                <td>{ element.exchangeRates[element.currency].name }</td>
                <td>
                  {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(element.exchangeRates[element.currency].ask * element.value)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <div className="Table-actions">
                    <button
                      type="button"
                      className="Table-edit-button"
                      onClick={ () => dispatch(startEditExpense(element.id)) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="Table-delete-button"
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpenses(element.id)) }
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
