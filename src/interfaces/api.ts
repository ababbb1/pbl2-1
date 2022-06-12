import { AxiosError, AxiosResponse } from 'axios'

export type RequestMethod = 'get' | 'post'
export type AppPathName = 'login' | 'register' | 'post'

export interface RequestConfig {
  [k: string]: { [k: string]: string }
}

export type ResponseSuccessCallback =
  | (() => void)
  | ((res: AxiosResponse<unknown, unknown>) => void)
  | ((res: AxiosResponse<unknown, unknown>) => unknown)

export type ResponseFailCallback =
  | (() => void)
  | ((res: AxiosError<unknown, unknown>) => void)
  | ((res: AxiosError<unknown, unknown>) => unknown)
