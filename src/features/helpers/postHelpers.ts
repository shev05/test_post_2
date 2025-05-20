import type { z } from 'zod'
import type { createPostFormSchema } from '../../shared/constants/scheme'

export const getInitialCreatePost = (initialData?: Partial<z.infer<typeof createPostFormSchema>>) => ({
  title: initialData?.title ?? '',
  text: initialData?.text ?? '',
})

export const createPostDto = (values: z.infer<typeof createPostFormSchema>) => ({
  title: values.title,
  text: values.text,
})
