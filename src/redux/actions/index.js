// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

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

export const addExpenses = (expenses) => async (dispatch) => {
  const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await endpoint.json();
  return dispatch(getExpenses({ ...expenses, exchangeRates: data }));
};

export const fetchApi = () => async (dispatch) => {
  const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await endpoint.json();
  return dispatch(responseApi(data));
};
