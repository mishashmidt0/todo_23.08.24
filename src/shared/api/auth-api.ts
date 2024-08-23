import { api } from '@/shared/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, any>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export const {
  endpoints: { register, login },
} = authApi;
