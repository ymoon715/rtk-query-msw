import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

/*
    Here, I set up the server's handler to return error first, then I server.use() to return status 200

    If I test the *** SUCCESS case FIRST, it FAILS***
    - when using server.use() with status 200 DOES NOT seem to work. Error case failed.
    - server.resetHandlers() seems to fail to reset the handler, only success case passes.
*/

const server = setupServer(
  rest.get('https://api.binance.com/api/v3/ticker/24hr', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ result: 'error' }));
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test('Renders Loading and success', async () => {
  server.use(
    rest.get('https://api.binance.com/api/v3/ticker/24hr', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ result: 'success' }));
    })
  );
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText('Loading');
  expect(linkElement).toBeInTheDocument();
  expect(await screen.findByText('Success')).toBeInTheDocument();
});

test('Renders Error', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(await screen.findByText('Error')).toBeInTheDocument();
});
