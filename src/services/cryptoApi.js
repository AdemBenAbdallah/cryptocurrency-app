import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptApiHeaders = {
  "X-RapidAPI-Key": "c04fb0f512msh06dba82e0b79937p1e10f8jsncc168e99c016",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptApiHeaders });

// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptos: (builder) => ({
//       getCrypto: builder.query({
//         query: () => createRequest("/coins"),
//       }),
//     }),
//   }),
// });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptosDetails: builder.query({
      query: (countID) => createRequest(`/coin/${countID}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinID, timeperiod }) =>
        createRequest(`coin/${coinID}/history?timeperiod=${timeperiod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptosDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
