import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.binance.com',
  }),
  endpoints: (builder) => ({
    getTickerPriceChange: builder.query<any, void>({
      query: () => ({
        url: `/api/v3/ticker/24hr`,
        method: 'GET',
        params: {
          symbol: 'BTCUSDT',
        },
      }),
    }),
  }),
});

export const { useGetTickerPriceChangeQuery } = binanceApi;
