import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Teste da pagina de feedback.',
  () => {
    it('inicia a aplicação na página de login e na rota /.',
      () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        const { pathname } = history.location;
        const headerScoreTestId = screen.getByTestId('header-score')
        expect(headerScoreTestId).toBeInTheDocument();
        const feedbackTestId = screen.getByTestId('feedback-text')
        expect(feedbackTestId).toBeInTheDocument();
        const feedbackTotalScoreTestId = screen.getByTestId('feedback-total-score')
        expect(feedbackTotalScoreTestId).toBeInTheDocument();
        const feedbackTotalQuestionTestId = screen.getByTestId('feedback-total-question')
        expect(feedbackTotalQuestionTestId).toBeInTheDocument();
        const playAgainBtn = screen.getByTestId('btn-play-again');
        const rankingBtn = screen.getByTestId('btn-ranking');
        expect(playAgainBtn).toBeEnabled();
        expect(rankingBtn).toBeEnabled();
        userEvent.click(playAgainBtn);
        expect(pathname).toBe('/');
    });

    it('inicia a aplicação na página de login e na rota /.',
    () => {
      const { history } = renderWithRouterAndRedux(<Feedback />);
      const headerScoreTestId = screen.getByTestId('header-score')
      expect(headerScoreTestId).toBeInTheDocument();
      const feedbackTestId = screen.getByTestId('feedback-text')
      expect(feedbackTestId).toBeInTheDocument();
      const feedbackTotalScoreTestId = screen.getByTestId('feedback-total-score')
      expect(feedbackTotalScoreTestId).toBeInTheDocument();
      const feedbackTotalQuestionTestId = screen.getByTestId('feedback-total-question')
      expect(feedbackTotalQuestionTestId).toBeInTheDocument();
      const playAgainBtn = screen.getByTestId('btn-play-again');
      const rankingBtn = screen.getByTestId('btn-ranking');
      expect(playAgainBtn).toBeEnabled();
      expect(rankingBtn).toBeEnabled();
      userEvent.click(rankingBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/ranking');
  });

  });