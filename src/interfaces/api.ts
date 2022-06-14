import { AxiosError, AxiosResponse } from 'axios'

export type RequestMethod = 'get' | 'post' | 'put'

export type ResponseSuccessCallback =
  | (() => void)
  | ((res: AxiosResponse<unknown, unknown>) => void)
  | ((res: AxiosResponse<unknown, unknown>) => unknown)

export type ResponseFailCallback =
  | (() => void)
  | ((res: AxiosError<unknown, unknown>) => void)
  | ((res: AxiosError<unknown, unknown>) => unknown)
