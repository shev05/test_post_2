export interface IComment {
  id: number
  comment: string
}

export interface ICommentCreate {
  comment: string
  postId: number
}
