import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editButton } from '../actions';
import './Expenses.css';

class Expenses extends React.Component {
  buttonDelete(id) {
    const { deleteExpenseButton, expenses } = this.props;

    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    deleteExpenseButton(filteredExpenses);
  }

  tableHeader() {
    return (
      <tr className="header-table">
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
    );
  }

  render() {
    const { expenses, editButtonExpense } = this.props;
    return (
      <table className="table">
        {this.tableHeader()}
        {expenses.map((expense) => {
          const currencyExpense = expense.currency;
          const exchangeRatesObj = expense.exchangeRates[currencyExpense];
          const valueNumber = expense.value;
          const correncyName = exchangeRatesObj.name.split('/')[0];
          const exchangeUsed = Number(exchangeRatesObj.ask).toFixed(2);
          const convertedValue = (valueNumber * exchangeRatesObj.ask).toFixed(2);
          return (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ valueNumber }</td>
              <td>{ correncyName }</td>
              <td>{ exchangeUsed }</td>
              <td>{ convertedValue }</td>
              <td>Real</td>
              <td>
                <button
                  className="button-edit-delete"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editButtonExpense(expense.id) }
                >
                  <i className="far fa-edit" />
                </button>
                <button
                  className="button-edit-delete"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.buttonDelete(expense.id) }
                >
                  <i className="far fa-trash-alt" />
                </button>
              </td>

            </tr>
          );
        })}
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseButton: (expenses) => dispatch(deleteExpense(expenses)),
  editButtonExpense: (id) => dispatch(editButton(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Expenses.propTypes = ({
  expenses: PropTypes.arrayOf().isRequired,
  deleteExpenseButton: PropTypes.func.isRequired,
  editButtonExpense: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
