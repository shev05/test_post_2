import type { User } from '../../../shared/constants/types/user'
import { URL_ADRESS } from '../../../shared/constants/url/api'
import { api } from '../api'

export const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query<User[], void>({
      query: () => ({
        url: URL_ADRESS.USERS_URL,
        method: 'GET',
      }),
    }),
  }),
})

export const { useUserQuery } = userEndpoints
