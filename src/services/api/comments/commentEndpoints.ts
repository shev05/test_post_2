import { ApiTagIds, ApiTags } from '../../../shared/constants/api/tags'
import type { IComment, ICommentCreate } from '../../../shared/constants/types/comment'
import { URL_ADRESS } from '../../../shared/constants/url/api'
import { api } from '../api'

export const commentEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IComment[], void>({
      query: () => ({
        url: URL_ADRESS.COMMENT_URL,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: ApiTags.COMMENT as const, id })), { type: ApiTags.COMMENT as const, id: ApiTagIds.LIST }]
          : [{ type: ApiTags.COMMENT as const, id: ApiTagIds.LIST }],
    }),
    createComment: builder.mutation<IComment, ICommentCreate>({
      query: (commentData) => ({
        url: URL_ADRESS.COMMENT_URL,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: [{ type: ApiTags.COMMENT as const, id: ApiTagIds.LIST }],
    }),
  }),
})

export const { useCreateCommentMutation, useGetCommentsQuery } = commentEndpoints
