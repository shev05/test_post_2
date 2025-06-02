import type { IComment } from './comment'
import type { User } from './user'

export interface Post {
  id: number
  title: string
  author: string
  text: string
  userId: number
  user: User
  comments: IComment[]
}

export interface IPostCreate {
  title?: string
  text?: string
}

export interface IPostUpdate {
  id: number
  title?: string
  text?: string
}

export interface IPostFilter {
  userId?: number | string
  sort_by?: string
}
