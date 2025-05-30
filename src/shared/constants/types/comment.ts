export interface IComment {
  id: number
  comment: string
  postId: number
}

export interface ICommentCreate {
  comment: string
  postId: number
}
