import { useState } from 'react'
import { CreatePostForm } from '../../../components/form/createPostForm'
import { Button } from '../../../components/ui/Button'
import { ModalWindow } from '../../../components/ui/modal'
import { useToggle } from '../../../hooks/useToggle'
import type { IPostFilter } from '../../../shared/constants/types/post'
import { useUserQuery } from '../../../services/api/user/userEndpoints'

interface IProps {
  onFilterChange: (filter: IPostFilter) => void
}

export const GlobalHeader = ({ onFilterChange }: IProps) => {
  const { data: users } = useUserQuery()
  const [currentFilter, setCurrentFilter] = useState<IPostFilter>({})

  const handleAuthorChange = (value: string) => {
    const newFilter = {
      ...currentFilter,
      userId: value === 'all' ? undefined : value,
    }
    setCurrentFilter(newFilter)
    onFilterChange(newFilter)
  }

  const handleSortChange = (value: string) => {
    const newFilter = {
      ...currentFilter,
      sort_direction: 'id',
      sort_by: value,
    }
    setCurrentFilter(newFilter)
    onFilterChange(newFilter)
  }
  const { open, isOpen, close } = useToggle()
  return (
    <>
      <div className="box-border flex w-full items-center justify-between border-b border-gray-300 px-3 py-10">
        <div className="mr-5 text-3xl font-bold">
          <p>Posts</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            onChange={(e) => handleAuthorChange(e.target.value)}
            className="h-12 rounded-md border border-gray-300 py-2 pl-4 pr-24 text-xl"
          >
            <option value="all">Все авторы</option>
            {users?.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-12 rounded-md border border-gray-300 py-2 pl-4 pr-24 text-xl"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <Button
            className="bg-black text-xl text-white"
            onClick={open}
          >
            Create post
          </Button>
        </div>
      </div>
      <ModalWindow
        isOpen={isOpen}
        onClose={close}
        title="Создать пост"
        description="Введите информацию о которой хотите рассказать. Нажмите пост, когда закончите"
      >
        <CreatePostForm closeModal={close} />
      </ModalWindow>
    </>
  )
}
