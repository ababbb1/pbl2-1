import { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { ResponseFailCallback } from '../interfaces/api'
import { IPost } from '../interfaces/app'
import { useAppDispatch } from '../store/hooks'
import { setPostList } from '../store/reducer'

const token = localStorage.getItem('token')
export const APP_DOMAIN = 'http://localhost:8080'
export const contentTypeHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
export const authHeaders: AxiosRequestHeaders = {
  Authorization: `Bearer ${token?.replaceAll('"', '')}`,
}
export const apiErrorHandler: ResponseFailCallback = (e: AxiosError<any, any>) => {
  console.log(e)
}

export const getPostRequest = (dispatch: Dispatch<PayloadAction<IPost[]>>) => {
  axios
    .get(`${APP_DOMAIN}/api/post`)
    .then((res: AxiosResponse) => {
      dispatch(setPostList(res.data.result.post_list))
    })
    .catch(apiErrorHandler)
}
