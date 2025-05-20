import type { z } from 'zod'
import type { loginFormSchema, registerFormSchema } from '../../shared/constants/scheme'

export const getInitialLoginUser = () => ({
  email: '',
  password: '',
})

export const getInitialRegisterUser = () => ({
  fullName: '',
  email: '',
  password: '',
})

export const loginUserDto = (values: z.infer<typeof loginFormSchema>, password: string) => ({
  email: values.email,
  password: password,
})

export const registerUserDto = (values: z.infer<typeof registerFormSchema>, password: string) => ({
  email: values.email,
  name: values.fullName,
  password: password,
})
