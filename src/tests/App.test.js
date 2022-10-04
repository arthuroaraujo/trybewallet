import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a aplicação', () => {
  test('Testando a tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    const emailInputEl = screen.getByTestId('email-input');
    const passwordInputEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(pathname).toBe('/');
    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();

    userEvent.type(emailInputEl, 'email@email.com');
    userEvent.type(passwordInputEl, '111111');

    expect(buttonEl).toBeEnabled();

    userEvent.click(buttonEl);

    expect(pathname).not.toBe('/carteira');
  });

  test('Testando a tela da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    const emailEl = screen.getByTestId('email-field');
    const totalEl = screen.getByTestId('total-field');
    const currEl = screen.getByTestId('header-currency-field');
    const valueEl = screen.getByTestId('value-input');
    const descEl = screen.getByTestId('description-input');
    const buttonEl = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(emailEl).toBeInTheDocument();
    expect(totalEl).toBeInTheDocument();
    expect(currEl).toBeInTheDocument();
    expect(valueEl).toBeInTheDocument();
    expect(descEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();

    userEvent.click(buttonEl);

    expect(pathname).toBe('/carteira');
  });

  test('Testando a table', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueEl = screen.getByTestId('email-field');
    const descEl = screen.getByTestId('description-input');
    const currEl = screen.getByTestId('currency-input');
    const mathodEl = screen.getByTestId('method-input');
    const tagEl = screen.getByTestId('tag-input');
    // const buttonEl = screen.getByRole('button', {
    //   name: /adicionar despesa/i,
    // });

    expect(valueEl).toBeInTheDocument();
    expect(descEl).toBeInTheDocument();
    expect(tagEl).toBeInTheDocument();
    expect(currEl).toBeInTheDocument();
    expect(mathodEl).toBeInTheDocument();
    // expect(buttonEl).toBeInTheDocument();
  });
});
