import { combineReducers } from 'redux';
import userReducer from './login';
import apiReturn from './apiReturn';
import playerReducer from './player';
import game from './game';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user: userReducer,
  api: apiReturn,
  player: playerReducer,
  game,
});

export default rootReducer;
