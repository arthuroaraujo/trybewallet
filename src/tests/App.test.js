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

  //   test('Testando a table', () => {
  //     renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  //     const descEl = screen.getByRole('columnheader', {
  //       name: /descrição/i,
  //     });
  //     const tagEl = screen.getByRole('columnheader', {
  //       name: /tag/i,
  //     });
  //     const paymentEl = screen.getByRole('columnheader', {
  //       name: /método de pagamento/i,
  //     });
  //     // const valueEl = screen.getByRole('columnheader', {
  //     //   name: /valor/i,
  //     // });
  //     // const coinEl = screen.getByRole('columnheader', {
  //     //   name: /moeda/i,
  //     // });
  //     const exchEl = screen.getByRole('columnheader', {
  //       name: /câmbio utilizado/i,
  //     });
  //     const convValEl = screen.getByRole('columnheader', {
  //       name: /valor convertido/i,
  //     });
  //     const convCoinEl = screen.getByRole('columnheader', {
  //       name: /moeda de conversão/i,
  //     });
  //     const editExcEl = screen.getByRole('columnheader', {
  //       name: /editar\/excluir/i,
  //     });

//     expect(descEl).toBeInTheDocument();
//     expect(tagEl).toBeInTheDocument();
//     expect(paymentEl).toBeInTheDocument();
//     // expect(valueEl).toBeInTheDocument();
//     // expect(coinEl).toBeInTheDocument();
//     expect(exchEl).toBeInTheDocument();
//     expect(convValEl).toBeInTheDocument();
//     expect(convCoinEl).toBeInTheDocument();
//     expect(editExcEl).toBeInTheDocument();
//   });
});
