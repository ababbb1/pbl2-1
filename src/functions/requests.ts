import axios from 'axios'
import { curry } from '@fxts/core'

type RequestMethod = 'get' | 'post'

const URL = 'http://localhost:8080/api/'
const postConfig = { headers: { 'Content-Type': 'application/json' } }

const requestReducer = curry((method: RequestMethod, config, path: string, onSuccess, onFail) => {
  return <T>(data?: T) =>
    axios[method](`${URL}/${path}`, data || config, (config = undefined))
      .then(onSuccess)
      .catch((e) => {
        e.response
          ? onFail(e)
          : e.request
          ? console.log(e.request)
          : console.log('Error', e.message)
        console.log(e.config)
      })
})

export const registerRequest = requestReducer('post', postConfig, 'register')
export const loginRequest = requestReducer('post', postConfig, 'login')
