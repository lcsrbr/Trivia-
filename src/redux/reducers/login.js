// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER, EMAIL } from '../actions';

const INITIAL_STATE = {
  user: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      user: action.value,
    };
  case EMAIL:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
};

export default userReducer;
