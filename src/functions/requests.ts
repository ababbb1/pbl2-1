import axios, { AxiosError } from 'axios'
import { curry } from '@fxts/core'
import {
  AppPathName,
  RequestConfig,
  RequestMethod,
  ResponseFailCallback,
  ResponseSuccessCallback,
} from '../interfaces'

const URL = 'http://localhost:8080/api/'
const postConfig: RequestConfig = { headers: { 'Content-Type': 'application/json' } }
const apiErrorHandler: ResponseFailCallback = (e: AxiosError<any, any>) => {
  const errMsg = e.response?.data.result.errorMessage
  errMsg && alert(errMsg)
}

const requestReducer = curry(
  (
    method: RequestMethod,
    config: RequestConfig | undefined,
    path: AppPathName,
    onSuccess: ResponseSuccessCallback,
  ) => {
    return <T>(data?: T | undefined) => {
      axios[method](`${URL}/${path}`, data || config, (config = undefined))
        .then(onSuccess)
        .catch((e: AxiosError) => {
          e.response
            ? apiErrorHandler(e)
            : e.request
            ? console.log(e.request)
            : console.log('Error', e.message)
          console.log(e.config)
        })
    }
  },
)

export const registerRequest = requestReducer('post', postConfig, 'register')
export const loginRequest = requestReducer('post', postConfig, 'login')
export const postingRequest = requestReducer('post', postConfig, 'post')
