import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'applicationApi',

  baseQuery: baseQueryWithRetry,

  tagTypes: ['Todos'],

  endpoints: () => ({}),
});
