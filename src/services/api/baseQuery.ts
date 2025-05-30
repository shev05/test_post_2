import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { URL_ADRESS } from '../../shared/constants/url/api'
import type { Tokens } from '../../shared/constants/types/tokens'
import { PATHS } from '../../shared/constants/route/routes'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: URL_ADRESS.REFRESH_URL,
        method: 'POST',
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as Tokens

      api.dispatch({ type: 'auth/setCredentials', payload: { token: accessToken } })

      result = await baseQuery(args, api, extraOptions)
    } else {
      window.location.href = PATHS.LOGIN
    }
  }

  return result
}
