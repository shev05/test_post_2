import type { z } from 'zod'
import type { createCommentFormSchema } from '../../shared/constants/scheme'

export const getInitialComment = () => ({
  comment: '',
})

export const createCommentDto = (values: z.infer<typeof createCommentFormSchema>, id: number) => ({
  comment: values.comment,
  postId: id,
})
