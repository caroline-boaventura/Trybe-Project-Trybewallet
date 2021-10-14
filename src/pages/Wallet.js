import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Expenses from '../components/Expenses';
// import logo from '../images/logo.jpg';
import logoWhite from '../images/logoWhite.jpg';
import './Wallet.css';

class Wallet extends React.Component {
  totalValueExpenses() {
    const { totalArray } = this.props;

    const total = totalArray.reduce((acc, curr) => {
      const currencyExpense = curr.currency;

      const objExchangeRates = curr.exchangeRates[currencyExpense];
      const askExchangeRates = parseFloat(objExchangeRates.ask);
      const number = parseFloat(curr.value);

      const valueExchange = number * askExchangeRates;

      acc += valueExchange;

      return acc;
    }, 0);

    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <header className="container-header">
          <div className="logo">
            <img src={ logoWhite } alt="logo" />
          </div>
          <div className="currency-field">
            <div data-testid="total-field">{ this.totalValueExpenses() }</div>
            <div data-testid="header-currency-field">BRL</div>
            <div data-testid="email-field">{ email }</div>
          </div>
        </header>
        <Form />
        <Expenses />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalArray: state.wallet.expenses,
});

Wallet.propTypes = ({
  email: PropTypes.string.isRequired,
  totalArray: PropTypes.arrayOf().isRequired,
});

export default connect(mapStateToProps)(Wallet);
