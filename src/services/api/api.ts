import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import { ApiTags } from '../../shared/constants/api/tags'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [ApiTags.USER, ApiTags.POST, ApiTags.COMMENT],
  endpoints: () => ({}),
})
