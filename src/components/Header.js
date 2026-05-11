import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  calcTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const valValue = curr.value;
      const askValue = curr.exchangeRates[curr.currency].ask;
      return acc + Number(valValue * askValue);
    }, 0);
    return Number(total).toFixed(2);
  };

  render() {
    const { email } = this.props;
    const total = this.calcTotal();
    const { expenses } = this.props;
    return (
      <div className="Header">
        <div className="Header-user">
          <span className="Header-label">Conta ativa</span>
          <h4 data-testid="email-field">{email}</h4>
        </div>
        <div className="Header-summary-card">
          <span className="Header-label">Total convertido</span>
          <h4 data-testid="total-field">{total}</h4>
        </div>
        <div className="Header-summary-card">
          <span className="Header-label">Moeda base</span>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
        <div className="Header-summary-card">
          <span className="Header-label">Lancamentos</span>
          <h4>{expenses.length}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string }).isRequired),
}.isRequired;

export default connect(mapStateToProps)(Header);
