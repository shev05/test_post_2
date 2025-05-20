import toast from 'react-hot-toast'
import { useDeletePostMutation, useGetPostQuery } from '../../../services/api/post/postEndpoints'
import type { IPostFilter } from '../../../shared/constants/types/post'
import { FORM_TEXTS } from '../../../shared/constants/text/FormText'

interface IProps {
  filter: IPostFilter
}

export const Main = ({ filter }: IProps) => {
  const { data: posts } = useGetPostQuery(filter)
  const [deletePost] = useDeletePostMutation()
  const handlePostDelete = async (postId: number) => {
    try {
      await deletePost(postId).unwrap()
      toast.success(FORM_TEXTS.POST_DELETE)
    } catch (error) {
      console.error(error)
      toast.error(FORM_TEXTS.POST_DELETE_ERROR)
    }
  }
  return (
    <div className="box-border grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts?.map((post) => {
        return (
          <div
            key={post.id}
            className="flex h-[250px] flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="mb-2 truncate text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="line-clamp-4 mb-3 flex-grow overflow-hidden text-sm text-gray-600">{post.text}</p>
            <p className="mb-3 truncate text-base text-gray-800">Author: {post?.user?.name}</p>
            <div className="mt-auto flex justify-between">
              <button className="rounded border border-gray-300 px-4 py-2 text-sm transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800">
                Посмотреть пост
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-red-600"
                onClick={() => handlePostDelete(post.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
