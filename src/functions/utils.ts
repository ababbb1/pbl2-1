import { useAuth } from '../hooks'
import jwtDecode from 'jwt-decode'
import { IUser } from '../interfaces/app'

export function cls(...classnames: string[]) {
  return classnames.join(' ')
}

export const emailCheck = (value: string) => {
  // eslint-disable-next-line
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return regExp.test(value) || '이메일 형식이 올바르지 않습니다'
}

export const getUserInfo = () => {
  const token = useAuth()
  if (token) {
    const user: IUser = jwtDecode(token)
    return user
  }
}
