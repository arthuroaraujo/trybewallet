// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const responseApi = (payload) => ({
  type: RESPONSE_API,
  payload,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await endpoint.json();
    return dispatch(responseApi(data));
  };
}
