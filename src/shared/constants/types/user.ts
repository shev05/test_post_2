export interface User {
  id: number
  fullName: string
  email: string
  password: string
  age: number
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
