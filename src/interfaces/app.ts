export type Page = 'home' | 'login' | 'join' | 'posting' | 'detail' | 'mypage'

export interface JoinForm {
  nickname: string
  email: string
  password: string
  passwordCheck: string
}

export interface PostForm {
  content: string
  images: FileList
  layout: 'default' | 'left' | 'right'
}

export interface IUser {
  email: string
  iat: number
  userId: number
  nickname: string
}

export interface IPost {
  content: string
  image: string
  likeByMe: string
  likeCount: number
  postId: number
  title: string
  userId: number
  layout: 'default' | 'left' | 'right'
  nickname: string
  createdAt: string
}
