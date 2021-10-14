import {
  REQUEST_API,
  DELETE_EXPENSE, EDIT_BUTTON, EDIT_EXPENSE, CURRIENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
};

let stateComponent;
let id;
let expenses;

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.state, exchangeRates: action.payload }],
    };

  case DELETE_EXPENSE: {
    return { ...state, expenses: action.expenses };
  }

  case EDIT_BUTTON: {
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  }

  case CURRIENCIES: {
    return { ...state, currencies: action.json };
  }

  // Requisito feito com a ajuda do colega Murilo Rainho
  case EDIT_EXPENSE: {
    stateComponent = action.stateComponent;
    id = action.id;
    expenses = action.expenses;

    const newExpense = expenses.reduce((acc, curr) => {
      if (curr.id !== id) return [...acc, curr];
      return [...acc, stateComponent];
    }, []);

    return {
      ...state,
      expenses: newExpense,
      editor: false,
    };
  }
  default:
    return state;
  }
}

export default wallet;
