import { useForm } from 'react-hook-form'
import { useCreatePostMutation, useUpdatePostMutation } from '../../services/api/post/postEndpoints'
import { createPostFormSchema, type PostFormValues } from '../../shared/constants/scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { createPostDto, getInitialCreatePost } from '../../features/helpers/postHelpers'
import toast from 'react-hot-toast'
import { TOAST_TEXT } from '../../shared/constants/text/ToastText'
import { TextFormField } from '../ui/textFromField'
import { InputType } from '../../shared/constants/enum/input'
import { Button } from '../ui/Button'

interface IProps {
  initialData?: Partial<z.infer<typeof createPostFormSchema>>
  postId?: number
  closeModal: () => void
}

export const CreatePostForm = ({ closeModal, initialData, postId }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: getInitialCreatePost(initialData),
  })

  const isEdit = !!postId
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()

  async function onSubmit(values: PostFormValues) {
    try {
      const post = createPostDto(values)
      await (isEdit ? updatePost({ id: postId, ...post }) : createPost(post).unwrap())
      toast.success(TOAST_TEXT.LOGIN)
      closeModal()
    } catch (error) {
      toast.error(TOAST_TEXT.LOGIN_ERROR)
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6"
    >
      <div className="space-y-4">
        <TextFormField
          label="Заголовок"
          placeholder="Напишите тему"
          register={register('title')}
          type={InputType.TEXT}
          error={errors.title?.message}
        />

        <TextFormField
          label="Текст"
          placeholder="Что вы хотите рассказать?"
          register={register('text')}
          type={InputType.TEXT}
          error={errors.text?.message}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          className="cursor-pointer hover:bg-gray-400"
          onClick={closeModal}
        >
          Отмена
        </Button>

        <Button
          type="submit"
          className="cursor-pointer bg-black text-white hover:bg-gray-800"
        >
          {isLoading ? 'Постим...' : 'Пост'}
        </Button>
      </div>
    </form>
  )
}
