import { useForm } from 'react-hook-form'
import { createCommentFormSchema, type CommentFormValue } from '../../shared/constants/scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCommentDto, getInitialComment } from '../../features/helpers/commentHelper'
import { TextFormField } from '../ui/textFromField'
import { InputType } from '../../shared/constants/enum/input'
import { Button } from '../ui/Button'
import { useCreateCommentMutation } from '../../services/api/comments/commentEndpoints'
import toast from 'react-hot-toast'
import { TOAST_TEXT } from '../../shared/constants/text/ToastText'

interface IProps {
  id: number
}

export const CreateCommentForm = ({ id }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValue>({
    resolver: zodResolver(createCommentFormSchema),
    defaultValues: getInitialComment(),
  })

  const [createComment] = useCreateCommentMutation()

  async function onSubmit(values: CommentFormValue) {
    try {
      const commentDto = createCommentDto(values, id)
      await createComment(commentDto).unwrap()
      toast.success(TOAST_TEXT.COMMENT)
    } catch (error) {
      console.log(error)
      toast.error(TOAST_TEXT.COMMENT_ERROR)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-4 my-6 space-y-6 rounded-lg border p-8 shadow-sm"
    >
      <TextFormField
        label="Комментарий"
        placeholder="Введите коммент"
        register={register('comment')}
        type={InputType.TEXTAREA}
        error={errors.comment?.message}
      />
      <div className="flex justify-end">
        <Button
          className="bg-black text-white"
          type="submit"
        >
          Добавить комментарий
        </Button>
      </div>
    </form>
  )
}
