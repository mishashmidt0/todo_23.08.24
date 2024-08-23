import { api } from '@/shared/api';

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<any, any>({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),
    getTodo: builder.query<any, number>({
      query: (id) => `todos/${id}`,
    }),
    createTodo: builder.mutation<any, any>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `todos`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<undefined, number>({
      query: (id) => {
        return {
          url: `todos`,
          method: 'DELETE',
          body: { id },
        };
      },
      invalidatesTags: ['Todos'],
    }),
  }),
});
export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
export const {
  endpoints: { getTodos, getTodo, createTodo, updateTodo, deleteTodo },
} = todosApi;
