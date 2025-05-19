import { z } from 'zod'
import { FORM_TEXTS } from './text/FormText'

export const loginFormSchema = z.object({
  email: z.string().email(FORM_TEXTS.LOGIN_ERROR),
  password: z.string().min(1, FORM_TEXTS.PASSWORD_ERROR),
})
export type LoginFormValues = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  fullName: z.string().min(1, FORM_TEXTS.FIO_ERROR),
  email: z.string().email(FORM_TEXTS.LOGIN_ERROR),
  password: z.string().min(1, FORM_TEXTS.PASSWORD_ERROR),
})
export type RegisterFormValues = z.infer<typeof registerFormSchema>
