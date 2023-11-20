export interface Icomment {
  id: number
  post: string
  text: string
  created_at: number
  isResponse: boolean
  responses: number[] | []
  user: {
    name: string
    avatar: string
  }
}

export interface IordComment {
  id: number
  post: string
  text: string
  created_at: number
  isResponse: boolean
  responses: IordComment[] | []
  user: {
    name: string
    avatar: string
  }
}
