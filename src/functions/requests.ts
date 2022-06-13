import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { curry, pipe } from '@fxts/core'
import {
  AppPathName,
  RequestMethod,
  ResponseFailCallback,
  ResponseSuccessCallback,
} from '../interfaces'

const token = localStorage.getItem('token')
const URL = 'http://localhost:8080/api/'
const postHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
const tokenHeaders: AxiosRequestHeaders = { 'authorization': token as string }

const apiErrorHandler: ResponseFailCallback = (e: AxiosError<any, any>) => {
  const errMsg = e.response?.data.result.errorMessage
  errMsg ? alert(errMsg) : console.log(e)
}

const requestReducer = curry(
  (method: RequestMethod, path: AppPathName, config?: AxiosRequestConfig) =>
    (onSuccess: ResponseSuccessCallback) => {
      return <T>(data?: T | undefined) => {
        const axiosExecution = data
          ? axios[method](`${URL}${path}`, data, config)
          : axios[method](`${URL}${path}`, config)
        axiosExecution.then(onSuccess).catch((e: AxiosError) => {
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

export const registerRequest = requestReducer('post', 'register', { headers: postHeaders })
export const loginRequest = requestReducer('post', 'login', { headers: postHeaders })
export const postingRequest = requestReducer('post', 'post', {
  headers: {...postHeaders, ...tokenHeaders},
})

// export const getPostsRequest = requestReducer('get', 'post')

// const requestMockData = curry(
//   (method: RequestMethod, config: AxiosRequestConfig | undefined = undefined) =>
//     (onSuccess: ResponseSuccessCallback) => {
//       return <T>(data?: T | undefined) => {
//         data
//           ? axios[method]('http://localhost:3000/data.json', data, config)
//           : axios[method]('http://localhost:3000/data.json', config)
//               .then(onSuccess)
//               .catch((e: AxiosError) => {
//                 e.response
//                   ? apiErrorHandler(e)
//                   : e.request
//                   ? console.log(e.request)
//                   : console.log('Error', e.message)
//                 console.log(e.config)
//               })
//       }
//     },
// )

// export const getPostsRequest = requestMockData('get')
