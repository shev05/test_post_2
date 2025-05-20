import type { Post } from './post'

export interface User {
  id: number
  name: string
  email: string
  password: string
  age: number
  post: Post
}

export interface ILoginUser {
  email: string
  password: string
}
export interface IRegisterUser {
  email: string
  name: string
  password: string
}
