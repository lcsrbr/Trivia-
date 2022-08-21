// Esse reducer será responsável por tratar as informações da pessoa usuária
import { FIVE_QUESTIONS, TOKEN } from '../actions';

const INITIAL_STATE = {
  questions: '',
  token: '',
};

function apiReturn(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FIVE_QUESTIONS:
    return {
      ...state,
      questions: action.value,
    };
  case TOKEN:
    return {
      ...state,
      token: action.value,
    };
  default:
    return state;
  }
}

export default apiReturn;
