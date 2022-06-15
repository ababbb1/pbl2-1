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

export const getItemsFromDateObject = (_date: Date) => {
  const today = new Date()
  const _year = _date.getFullYear()
  const _hours = _date.getHours()
  const _minutes = _date.getMinutes()
  const concat0 = (i: number): string => (i < 10 ? `0${i}` : i.toString())
  const notThisYear = today.getFullYear() !== _year ? _year : ''
  const notThisYearKor = notThisYear ? `${notThisYear}년` : ''
  const ampm =
    _hours > 12
      ? `PM ${concat0(_hours - 12)}:${concat0(_minutes)}`
      : `AM ${concat0(_hours)}:${concat0(_minutes)}`
  const ampmKor =
    _hours > 12
      ? `오후 ${concat0(_hours - 12)}:${concat0(_minutes)}`
      : `오전 ${concat0(_hours)}:${concat0(_minutes)}`

  return {
    year: _year,
    month: _date.getMonth() + 1,
    date: _date.getDate(),
    hours: _hours,
    minutes: _minutes,
    seconds: _date.getSeconds(),
    ampm,
    ampmKor,
    notThisYear,
    notThisYearKor,
  }
}

export const urlToFile = async (url: string) => {
  const response = await fetch(url)
  const data = await response.blob()
  const ext = url.split('.').pop() // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop() // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` }
  return new File([data], filename!, metadata)
}

export const createFileList = (...files: File[]) => {
  let getDataTransfer = (): DataTransfer | null => {
    return new DataTransfer()
  }

  const concat = Array.prototype.concat

  try {
    getDataTransfer()
  } catch (_unused) {
    getDataTransfer = () => {
      const clipboardEvent = new ClipboardEvent('')
      return clipboardEvent.clipboardData
    }
  }

  function a() {
    const fs = concat.apply([], files)
    let i = 0
    const length = files.length
    const dataTransfer = getDataTransfer()

    for (; i < length; i++) {
      dataTransfer?.items.add(fs[i])
    }

    return dataTransfer?.files
  }

  return a()
}
