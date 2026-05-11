// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RESPONSE_API,
  GET_EXPENSES,
  DELETE_EXPENSES,
  START_EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
  CANCEL_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
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
  case START_EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: null,
      expenses: state.expenses.map((element) => (
        element.id === action.payload.id ? action.payload : element
      )),
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses
        .filter((element) => element.id !== action.id),
    };
  case CANCEL_EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: null,
    };
  default:
    return state;
  }
}

export default walletReducer;
