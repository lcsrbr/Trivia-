import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste da pagina de login.',
  () => {
    it('inicia a aplicação na página de login e na rota /.',
      () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const { pathname } = history.location;
        expect(pathname).toBe('/');
        const emailTestId = screen.getByTestId('input-gravatar-email')
        expect(emailTestId).toBeInTheDocument();
        const nameTestId = screen.getByTestId('input-player-name')
        expect(nameTestId).toBeInTheDocument();
        const button = screen.getByTestId('btn-play')
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('o botão só habilita um usuario e e-mail digitados',
    () => {
        renderWithRouterAndRedux(<App />);
        const emailTestId = screen.getByTestId('input-gravatar-email')
        const button = screen.getByTestId('btn-play');
        const nameTestId = screen.getByTestId('input-player-name');
        expect(button).toBeDisabled();

        userEvent.type(emailTestId, 'email@teste.com');
        userEvent.type(nameTestId, '');
        expect(button).toBeDisabled();

        userEvent.type(emailTestId, 'email@teste.com');
        userEvent.type(nameTestId, 'nome');
        expect(button).toBeEnabled();
      });
      it('o acesso é liberado e o usuario e e-mail salvo na store.', () => {
        const { store, history } = renderWithRouterAndRedux(<App />, '/');
        const validEmail = 'email@email.com'
        const emailTestId = screen.getByTestId('input-gravatar-email')
        const button = screen.getByTestId('btn-play');
        const nameTestId = screen.getByTestId('input-player-name');
        userEvent.type(emailTestId, validEmail);
        userEvent.type(nameTestId, 'nome');
        expect(button).toBeEnabled();
        userEvent.click(button);
      expect(store.getState().user.email).toBe(validEmail);
      expect(store.getState().user.user).toBe('nome');
       });
       it('o usuario é direcionado para página de configurações ao clicar no botão', () => {
        const { history } = renderWithRouterAndRedux(<App />, '/');
        const buttonSettings = screen.getByTestId('btn-settings');
        expect(buttonSettings).toBeEnabled();
        userEvent.click(buttonSettings);
        const { pathname } = history.location;
        expect(pathname).toBe('/settings');

       });
  });