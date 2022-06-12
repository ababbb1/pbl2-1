export type Page = 'home' | 'login' | 'join' | 'posting' | 'detail' | 'mypage'

export interface JoinForm {
  nickname: string
  email: string
  password: string
  passwordCheck: string
}
