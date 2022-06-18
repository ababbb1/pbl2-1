import { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { ResponseFailCallback } from '../interfaces/api'
import { IPost } from '../interfaces/app'
import { AppDispatch, useAppDispatch } from '../store/configStore'
import { setPostList } from '../store/reducer'

const token = localStorage.getItem('token')
export const APP_DOMAIN = 'http://3.37.89.152'
export const contentTypeHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
export const authHeaders: AxiosRequestHeaders = {
  Authorization: `Bearer ${token?.replaceAll('"', '')}`,
}
export const apiErrorHandler: ResponseFailCallback = (e: AxiosError<any, any>) => {
  console.log(e)
}

export const fetchList = async (dispatch: AppDispatch) => {
  axios
    .get(`${APP_DOMAIN}/api/post`)
    .then((res) => {
      dispatch(setPostList(res.data.result.post_list))
    })
    .catch(apiErrorHandler)
}

export const fetchItem = async (postId: number) => {
  const res: any = await axios({
    url: `${APP_DOMAIN}/api/post/${postId}`,
    headers: authHeaders,
  }).catch(apiErrorHandler)

  const item: IPost = res.data.result
  return item
}
