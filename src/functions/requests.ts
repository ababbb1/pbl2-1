import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { curry } from '@fxts/core'
import { RequestMethod, ResponseFailCallback, ResponseSuccessCallback } from '../interfaces'

const token = localStorage.getItem('token')?.replaceAll('"', '')

const URL = 'http://localhost:8080/api/'
const postHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
const tokenHeaders: AxiosRequestHeaders = { 'Authorization': `Bearer ${token}` }

const apiErrorHandler: ResponseFailCallback = (e: AxiosError<any, any>) => {
  const errMsg = e.response?.data.errorMessage
  errMsg ? alert(errMsg) : console.log(e)
}

const requestReducer = curry(
  (method: RequestMethod, path: string, config?: AxiosRequestConfig) =>
    (onSuccess: ResponseSuccessCallback) => {
      console.log('success')
      return <T>(data?: T | undefined) => {
        console.log(method, `${URL}${path}`, data, config)
        const axiosExecution = data
          ? axios[method](`${URL}${path}`, data, config)
          : axios[method](`${URL}${path}`)

        console.log(axiosExecution)

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

export const registerRequest = requestReducer('post', 'register', {headers: postHeaders})
export const loginRequest = requestReducer('post', 'login', {headers: postHeaders})
export const postingRequest = requestReducer('post', 'post', {headers: Object.assign(postHeaders, tokenHeaders)})
export const getPostsRequest = requestReducer('get', 'post', {})

export const postModifyRequest = (postId: number) =>
  requestReducer('post', `post/${postId}`)
export const postDeleteRequest = (postId: number) =>
  requestReducer('post', `post/${postId}`)

export const likeRequest = (postId: number) =>
  requestReducer('post', `post/${postId}/like`)
