import axios from 'axios'
import { JoinForm } from '../interfaces'
import { SubmitHandler } from 'react-hook-form'

export const registerRequest = (cb: () => void): SubmitHandler<JoinForm> => {
  return (data: JoinForm) => { axios
    .post('http://localhost:8080/api/register', data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => cb())
    .catch((e) => {
      alert(e.response.data.result.errorMessage)
    })}
}
