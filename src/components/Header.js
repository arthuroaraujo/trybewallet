import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

export class Header extends Component {
  state = {
    total: 0,
  };

  render() {
    const { total } = this.state;
    const { email } = this.props;
    return (
      <div>
        Header
        <h4
          data-testid="email-field"
        >
          {email}

        </h4>
        <h4
          data-testid="total-field"
        >
          {total}

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
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
