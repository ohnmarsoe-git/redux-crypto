import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
  'X-RapidAPI-Key': '096323d1d3msh37c0c254637d643p11a208jsn9b645090bfe2',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url) => ({url, headers: apiHeaders});

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoById: builder.query({
      query: (coinId) => createRequest(`coin/${coinId}`)
    }),

    getCryptoHistory: builder.query({
      query: ({coinId, timeperiod}) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`)
    })
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoByIdQuery,
  useGetCryptoHistoryQuery
} = cryptoApi;