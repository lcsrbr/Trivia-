import { GETINFORANK } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  infoRanking: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GETINFORANK:
    return {
      ...state,
      infoRanking: [
        ...state.infoRanking, action.payload],
    };
  default:
    return state;
  }
};

export default game;
