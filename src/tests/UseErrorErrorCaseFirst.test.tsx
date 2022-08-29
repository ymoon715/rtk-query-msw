import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

/*
    If I test the *** ERROR case FIRST, it PASSES***
    - when using server.use() with status 400 seems to work. All case passed
    - server.resetHandlers() resets it, success case passes.
*/

const server = setupServer(
  rest.get('https://api.binance.com/api/v3/ticker/24hr', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ result: 'success' }));
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test('Renders Error', async () => {
  server.use(
    rest.get('https://api.binance.com/api/v3/ticker/24hr', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ result: 'error' }));
    })
  );
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(await screen.findByText('Error')).toBeInTheDocument();
});

test('Renders Loading and success', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText('Loading');
  expect(linkElement).toBeInTheDocument();
  expect(await screen.findByText('Success')).toBeInTheDocument();
});
