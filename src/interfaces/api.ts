import { AxiosError, AxiosResponse } from 'axios'

export type RequestMethod = 'get' | 'post'
export type AppPathName = 'login' | 'register' | 'post'

export interface RequestConfig {
  [k: string]: { [k: string]: string }
}

export type ResponseSuccessCallback =
  | (() => void)
  | ((res: AxiosResponse<any, any>) => void)
  | ((res: AxiosResponse<any, any>) => unknown)

export type ResponseFailCallback =
  | (() => void)
  | ((res: AxiosError<any, any>) => void)
  | ((res: AxiosError<any, any>) => unknown)
