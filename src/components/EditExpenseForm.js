import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, fetchApiCurriencies } from '../actions';
import './EditExpenseForm.css';

class EditExpenseForm extends React.Component {
  constructor() {
    super();

    this.savedInStateComponent = this.savedInStateComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      expensesComponent: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    const { currienciesOptions } = this.props;
    currienciesOptions(); // options siglas moedas
    this.savedInStateComponent();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState((previousState) => ({
      expensesComponent: {
        ...previousState.expensesComponent,
        [name]: value,
      },
    }));
  }

  // recupera do Redux dados salvos do obj a ser editado (para preencher os inputs)
  savedInStateComponent() {
    const { idToEdit, expenses } = this.props;

    const objetcEdit = expenses.find((expense) => expense.id === idToEdit);
    const { id, value, description, currency, method, tag, exchangeRates } = objetcEdit;

    this.setState({
      expensesComponent: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    });
  }

  // fetchApi() {
  //   fetch('https://economia.awesomeapi.com.br/json/all')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({
  //         apiResponse: json,
  //       });
  //     });
  // }

  // filterCurrency() {
  //   const { currencies } = this.props;

  //   const initials = Object.keys(currencies);

  //   const filteredInitials = initials.filter((initial) => initial !== 'USDT');

  //   return filteredInitials;
  // }

  labelValue() {
    const { expensesComponent: { value } } = this.state;

    return (
      <label htmlFor="value">
        Valor
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
          className="form-control input-control"
        />
      </label>
    );
  }

  labelDescription() {
    const { expensesComponent: { description } } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
          className="form-control input-control"
        />
      </label>
    );
  }

  labelCurrency() {
    const { expensesComponent: { currency } } = this.state;
    const { currencies } = this.props;
    const initials = Object.keys(currencies);
    const filteredInitials = initials.filter((initial) => initial !== 'USDT');

    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
          className="form-control input-control"
        >
          { filteredInitials
            .map((option, index) => (
              <option key={ index } value={ option }>{ option }</option>)) }
        </select>
      </label>
    );
  }

  render() {
    const { expensesComponent } = this.state;
    const { id, method, tag } = expensesComponent;
    const { expenses, editExpenseProp } = this.props;
    return (
      <form className="form-container-edit">
        {this.labelValue()}
        {this.labelDescription()}
        {this.labelCurrency()}
        <label htmlFor="payment">
          Método de Pagamento
          <select
            name="method"
            id="payment"
            value={ method }
            onChange={ this.handleChange }
            className="form-control input-control"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            className="form-control input-control"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => editExpenseProp(id, expensesComponent, expenses) }
          className="btn btn-light button-edit"
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseProp: (id, stateComponent, expenses) => dispatch(
    editExpense(id, stateComponent, expenses),
  ),
  currienciesOptions: () => dispatch(fetchApiCurriencies()),
});

EditExpenseForm.propTypes = ({
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
  editExpenseProp: PropTypes.func.isRequired,
  currienciesOptions: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf().isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
