// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SCORE, HITS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.value,
    };
  case HITS:
    return {
      ...state,
      assertions: action.value,
    };
  default:
    return state;
  }
};

export default playerReducer;
