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

export const createPostFormSchema = z.object({
  title: z.string().min(1, FORM_TEXTS.CREATE_POST_TITLE_ERROR),
  text: z.string().min(1, FORM_TEXTS.CREATE_POST_BODY_ERROR),
})

export type PostFormValues = z.infer<typeof createPostFormSchema>

export const createCommentFormSchema = z.object({
  comment: z.string().min(1, FORM_TEXTS.COMMENT_ERROR),
})

export type CommentFormValue = z.infer<typeof createCommentFormSchema>
