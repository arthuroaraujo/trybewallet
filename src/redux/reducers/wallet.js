// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RESPONSE_API, GET_EXPENSES, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESPONSE_API:
    return {
      ...state,
      currencies: Object.keys(action.payload)
        .filter((element) => element !== 'USDT'),
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses
        .filter((element) => element.id !== action.id),
    };
  default:
    return state;
  }
}

export default walletReducer;
