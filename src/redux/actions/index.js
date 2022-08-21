// Coloque aqui suas actions
export const USER = 'USER';
export const SCORE = 'SCORE';
export const HITS = 'HITS';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';
export const FIVE_QUESTIONS = 'FIVE_QUESTIONS';
export const GETINFORANK = 'GETINFORANK';

export const loginUser = (value) => ({
  type: USER,
  value,
});

export const loginEmail = (value) => ({
  type: EMAIL,
  value,
});

export const apiReturn = (value) => ({
  type: FIVE_QUESTIONS,
  value,
});

export const tokenReturn = (value) => ({
  type: TOKEN,
  value,
});

export const playerScore = (value) => ({
  type: SCORE,
  value,
});

export const playerHits = (value) => ({
  type: HITS,
  value,
});

export const getInfoRanking = (payload) => ({
  type: GETINFORANK,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      dispatch(tokenReturn(data.token));
      const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${data.token}`);
      const dataResult = await result.json();
      dispatch(apiReturn(dataResult.results));
    } catch (error) {
      console.error(error);
    }
  };
}
