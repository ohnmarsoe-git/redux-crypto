import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const apiHeaders = {
//   'Access-Control-Allow-Origin' : '*'
// }

const baseUrl = 'https://api.coingecko.com/api/v3';

const createRequest = (url) => ({url});

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosExchanges: builder.query({
      query: () => createRequest(`/exchanges?per_page=100`),
    }),
  }),
});

export const {
  useGetCryptosExchangesQuery,
} = cryptoExchangesApi;