import { SubmitHandler, useForm } from 'react-hook-form'
import { useSetPage } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { JoinForm } from '../../interfaces/app'
import { apiErrorHandler, APP_DOMAIN, contentTypeHeaders } from '../../functions/requests'
import Input from '../assets/input'
import { emailCheck } from '../../functions/utils'
import ErrorMessage from '../assets/errorMessage'
import Button from '../assets/button'
import axios from 'axios'

export default function Join() {
  useSetPage('join')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>({ mode: 'onBlur' })

  const onValid: SubmitHandler<JoinForm> = (data: JoinForm) => {
    axios({
      method: 'post',
      url: `${APP_DOMAIN}/api/register`,
      data,
      headers: contentTypeHeaders,
    })
      .then(() => {
        alert('회원가입 성공')
        navigate('/login')
      })
      .catch(apiErrorHandler)
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center h-screen gap-5 px-4 pt-16 w-full max-w-sm'
    >
      <span className='mb-4 text-lg'>회원가입</span>
      <div className='w-full'>
        <Input
          register={register('email', {
            required: '이메일을 입력해주세요.',
            validate: { emailCheck },
          })}
          placeholder='이메일'
          type='text'
          label='이메일'
          invalid={errors.email}
        />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div className='flex flex-col gap-2 w-full'>
        <Input
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
          placeholder='비밀번호'
          type='password'
          label='비밀번호'
          invalid={errors.password}
        />
        <ErrorMessage message={errors.password?.message} />
        <Input
          register={register('passwordCheck', {
            required: '비밀번호가 일치하지 않습니다.',
          })}
          placeholder='비밀번호 재입력'
          type='password'
          invalid={errors.password}
        />
        <ErrorMessage message={errors.passwordCheck?.message} />
      </div>

      <div className='flex flex-col gap-2 w-full'>
        <Input
          register={register('nickname', {
            required: '닉네임을 입력해주세요.',
          })}
          placeholder='닉네임'
          type='text'
          label='닉네임'
          invalid={errors.nickname}
        />
        <ErrorMessage message={errors.nickname?.message} />
      </div>

      <div className='mt-6 flex flex-col gap-2 w-full'>
        <Button type='submit' text='가입하기' style='bg-theme1 text-white h-12' />
      </div>
    </form>
  )
}
