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
    return (
      <div className="Header">
        <h4
          data-testid="email-field"
        >
          {email}

        </h4>
        <h4
          data-testid="total-field"
        >
          { this.calcTotal() }

        </h4>
        <h4
          data-testid="header-currency-field"
        >
          BRL

        </h4>
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
