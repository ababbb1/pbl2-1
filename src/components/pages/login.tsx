import { SubmitHandler, useForm } from 'react-hook-form'
import { useSetPage } from '../../hooks'
import { Button, Input, ErrorMessage } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { emailCheck, loginRequest } from '../../functions'
import { AxiosResponse } from 'axios'

export interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  useSetPage('login')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onBlur' })

  const onValid: SubmitHandler<LoginForm> = loginRequest((res: AxiosResponse<any, any>) => {
    console.log(res.data)
    localStorage.setItem('token', JSON.stringify(res.data.result.token))
    navigate('/', { replace: true })
    console.log(localStorage.getItem('token'))
  })

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center h-screen gap-4 px-4 pt-24 w-full max-w-sm'
    >
      <span className='mb-4 text-lg'>로그인</span>

      <div className='w-full flex flex-col gap-1'>
        <Input
          register={register('email', {
            required: '이메일을 입력해주세요.',
            validate: { emailCheck: emailCheck },
          })}
          placeholder='이메일'
          type='text'
          invalid={errors.email}
        />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div className='w-full flex flex-col gap-1'>
        <Input
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
          placeholder='비밀번호'
          type='password'
          invalid={errors.password}
        />
        <ErrorMessage message={errors.password?.message} />
      </div>

      <div className='mt-6 flex flex-col gap-2 w-full'>
        <Button type='submit' text='로그인' style='bg-theme1 text-white h-12' />
        <Link to={'/join'}>
          <Button
            type={'button'}
            text='회원가입'
            style='bg-white text-theme1 border border-theme1 h-12'
          />
        </Link>
      </div>
    </form>
  )
}
