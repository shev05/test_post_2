import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { URL_ADRESS } from '../../shared/constants/url/api'
import type { Tokens } from '../../shared/constants/types/tokens'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token')

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: URL_ADRESS.REFRESH_URL,
          method: 'POST',
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        const { access_token, refresh_token } = refreshResult.data as Tokens

        api.dispatch({ type: 'auth/setCredentials', payload: { token: access_token } })
        localStorage.setItem('refresh_token', refresh_token)

        result = await baseQuery(args, api, extraOptions)
      } else {
        localStorage.removeItem('refresh_token')
      }
    }
  }

  return result
}
