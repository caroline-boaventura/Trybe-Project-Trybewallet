import {
  USER,
  REQUEST_API,
  DELETE_EXPENSE, EDIT_BUTTON, EDIT_EXPENSE, CURRIENCIES } from './actionTypes';

export const userAction = (email) => ({
  type: USER,
  payload: email,
});

// === Moedas p/ options ===
const curriencies = (json) => ({
  type: CURRIENCIES,
  json,
});

// === thunk ===
export function fetchApiCurriencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(curriencies(json)));
}

const requestApi = (json, state) => ({
  type: REQUEST_API,
  payload: json,
  state,
});

// ==== thunk ====
export function fetchApi(state) {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(requestApi(json, state)));
}

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const editButton = (id) => ({
  type: EDIT_BUTTON,
  id,
});

export const editExpense = (id, stateComponent, expenses) => ({
  type: EDIT_EXPENSE,
  id,
  stateComponent,
  expenses,
});
