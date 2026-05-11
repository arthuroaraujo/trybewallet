// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const START_EDIT_EXPENSE = 'START_EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const CANCEL_EDIT_EXPENSE = 'CANCEL_EDIT_EXPENSE';

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const responseApi = (payload) => ({
  type: RESPONSE_API,
  payload,
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export const startEditExpense = (id) => ({
  type: START_EDIT_EXPENSE,
  id,
});

export const saveEditedExpenseAction = (payload) => ({
  type: SAVE_EDITED_EXPENSE,
  payload,
});

export const cancelEditExpense = () => ({
  type: CANCEL_EDIT_EXPENSE,
});

export const addExpenses = (expenses) => async (dispatch) => {
  const endpoint = await fetch(API_URL);
  const data = await endpoint.json();
  return dispatch(getExpenses({ ...expenses, exchangeRates: data }));
};

export const fetchApi = () => async (dispatch) => {
  const endpoint = await fetch(API_URL);
  const data = await endpoint.json();
  return dispatch(responseApi(data));
};

export const saveEditedExpense = (expense) => async (dispatch) => {
  const endpoint = await fetch(API_URL);
  const data = await endpoint.json();
  return dispatch(saveEditedExpenseAction({ ...expense, exchangeRates: data }));
};
