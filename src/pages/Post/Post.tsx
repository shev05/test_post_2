import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePostMutation, useGetPostQuery } from '../../services/api/post/postEndpoints'
import { Button } from '../../components/ui/Button'
import { PATHS } from '../../shared/constants/route/routes'
import toast from 'react-hot-toast'
import { FORM_TEXTS } from '../../shared/constants/text/FormText'
import { ModalWindow } from '../../components/ui/modal'
import { CreatePostForm } from '../../components/form/createPostForm'
import { useToggle } from '../../hooks/useToggle'
import { useGetCommentsQuery } from '../../services/api/comments/commentEndpoints'
import { CreateCommentForm } from '../../components/form/createCommentForm'

export const Post = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deletePost] = useDeletePostMutation()
  const { data: comments } = useGetCommentsQuery()
  const { open, isOpen, close } = useToggle()
  const handlePostDelete = async () => {
    try {
      await deletePost(Number(id)).unwrap()
      toast.success(FORM_TEXTS.POST_DELETE)
      navigate(PATHS.HOME)
    } catch (error) {
      console.error(error)
      toast.error(FORM_TEXTS.POST_DELETE_ERROR)
    }
  }

  const { data: post } = useGetPostQuery(id!, { skip: !id })
  return (
    <div className="mx-auto">
      <div className="box-border flex w-full items-center justify-between border-b border-gray-300 px-3 py-6">
        <Button
          className="bg-black text-white"
          onClick={() => {
            navigate(PATHS.HOME)
          }}
        >
          Вернуться к посту
        </Button>
      </div>
      <div className="m-4 flex flex-col rounded-lg border border-gray-300 p-6">
        <h2 className="pb-2 text-xl font-bold">{post?.title}</h2>
        <div className="pb-8 text-sm text-gray-400">{post?.text}</div>
        <div className="flex justify-between">
          <Button
            className="bg-black text-white"
            onClick={open}
          >
            Изменить пост
          </Button>
          <Button
            className="bg-red-600 text-white"
            onClick={handlePostDelete}
          >
            Удалить пост
          </Button>
        </div>
      </div>
      <h1 className="m-4 mt-10 text-2xl font-bold">Комментарии</h1>
      <div className="flex w-full flex-col">
        {comments?.map((comment) => (
          <div
            className="mx-4 my-2 box-border flex flex-col rounded-lg border border-gray-300 p-2"
            key={comment.id}
          >
            {comment.comment}
          </div>
        ))}
      </div>
      <CreateCommentForm id={Number(id)} />
      <ModalWindow
        isOpen={isOpen}
        onClose={close}
        title="Измените пост"
        description="Введите информацию о которую хотите изменить. Нажмите пост, когда закончите"
      >
        <CreatePostForm
          closeModal={close}
          postId={Number(id)}
          initialData={post}
        />
      </ModalWindow>
    </div>
  )
}
