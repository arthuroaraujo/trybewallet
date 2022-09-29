// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RESPONSE_API } from '../actions';

const INITIAL_STATE = {
  currency: [],
};

function wallet(state = INITIAL_STATE, action) {
//   console.log(action.payload);
  switch (action.type) {
  case RESPONSE_API:
    return {
      ...state,
      currency: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
