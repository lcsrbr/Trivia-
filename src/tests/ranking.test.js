import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import Game from '../pages/Game';
import tokenResponse from './helpers/mocks/token'
import fetch from './helpers/mocks/fetch'
import { waitFor } from '@testing-library/react';

const api = Promise.resolve({
    json: () => Promise.resolve(fetch),
    ok: true,
  });
  const mockAPI = jest.spyOn(global, 'fetch').mockImplementation(() => tokenResponse);
  afterEach(() => jest.clearAllMocks());

describe('Teste da pagina de ranking.',
  () => {
    it('inicia a aplicação na página de ranking e na rota /ranking.',
      () => {
      const { history} = renderWithRouterAndRedux(<Ranking />);
        const rankingTitleTestId = screen.getByTestId('ranking-title')
        expect(rankingTitleTestId).toBeInTheDocument();
        const btnHomeTestId = screen.getByTestId('btn-go-home')
        expect(btnHomeTestId).toBeInTheDocument();
        const { pathname } = history.location;
        userEvent.click(btnHomeTestId);
        expect(pathname).toBe('/');
    });
    it('o acesso é liberado e o usuario e e-mail salvo na store.', async () => {
      const { store, history } = renderWithRouterAndRedux(<App />, '/');
      const validEmail = 'email@email.com'
      const emailTestId = screen.getByTestId('input-gravatar-email')
      const button = screen.getByTestId('btn-play');
      const nameTestId = screen.getByTestId('input-player-name');
      userEvent.type(emailTestId, validEmail);
      userEvent.type(nameTestId, 'nome');
      expect(button).toBeEnabled();
      userEvent.click(button);
    // expect(store.getState().user.email).toBe(validEmail);
    // expect(store.getState().user.user).toBe('nome');
    await new Promise((r) => setTimeout(r, 5000))
    // const { pathname } = history.location;
    waitFor(expect(history.location.pathname).toBe('/game'));
    // const correctAnswer = screen.getByTestId('correct-answer');
    // const nextButton = screen.getByTestId('btn-next');
    // userEvent.click(correctAnswer);
    // userEvent.click(nextButton);
    // userEvent.click(correctAnswer);
    // userEvent.click(nextButton);    
    // userEvent.click(correctAnswer);
    // userEvent.click(nextButton);    
    // userEvent.click(correctAnswer);
    // userEvent.click(nextButton);    
    // userEvent.click(correctAnswer);
    // userEvent.click(nextButton);

     });
});
