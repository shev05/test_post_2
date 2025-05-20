import type { Tokens } from '../../../shared/constants/types/tokens'
import type { ILoginUser, User } from '../../../shared/constants/types/user'
import { URL_ADRESS } from '../../../shared/constants/url/api'
import { api } from '../api'

export const authEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Tokens, ILoginUser>({
      query: (credentials) => ({
        url: URL_ADRESS.AUTH_URL,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<User, ILoginUser>({
      query: (registerData) => ({
        url: URL_ADRESS.REGISTER_URL,
        method: 'POST',
        body: registerData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authEndpoints
