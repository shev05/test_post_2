import { ApiTagIds, ApiTags } from '../../../shared/constants/api/tags'
import type { IPostCreate, IPostFilter, IPostUpdate, Post } from '../../../shared/constants/types/post'
import { URL_ADRESS } from '../../../shared/constants/url/api'
import { api } from '../api'

export const postEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], IPostFilter>({
      query: (filters: IPostFilter) => ({
        url: URL_ADRESS.POSTS_URL,
        method: 'GET',
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: ApiTags.POST as const, id })), { type: ApiTags.POST as const, id: ApiTagIds.LIST }]
          : [{ type: ApiTags.POST as const, id: ApiTagIds.LIST }],
    }),
    createPost: builder.mutation<Post, IPostCreate>({
      query: (postData) => ({
        url: URL_ADRESS.POSTS_CREATE_URL,
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: [{ type: ApiTags.POST as const, id: ApiTagIds.LIST }],
    }),
    updatePost: builder.mutation<Post, IPostUpdate>({
      query: ({ id, ...patch }) => ({
        url: `${URL_ADRESS.POSTS_URL}/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: ApiTags.POST, id },
        { type: ApiTags.POST, id: ApiTagIds.LIST },
      ],
    }),
    deletePost: builder.mutation<{ success: boolean }, number>({
      query: (id: number) => ({
        url: `${URL_ADRESS.POSTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result: unknown, _error: unknown, id: number) => [{ type: ApiTags.POST as const, id }],
    }),
    getPost: builder.query<Post, string>({
      query: (id: string) => `${URL_ADRESS.POSTS_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: ApiTags.POST, id }],
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation, useGetPostQuery } = postEndpoints
