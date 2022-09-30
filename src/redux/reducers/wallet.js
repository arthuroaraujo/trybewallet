// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RESPONSE_API, GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  // console.log(action.payload);
  switch (action.type) {
  case RESPONSE_API:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((element) => element !== 'USDT'),
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...expenses, action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
