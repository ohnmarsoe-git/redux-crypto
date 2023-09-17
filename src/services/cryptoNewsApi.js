import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const apiNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': '096323d1d3msh37c0c254637d643p11a208jsn9b645090bfe2',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: apiNewsHeaders});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),

  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
