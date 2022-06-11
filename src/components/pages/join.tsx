import { useForm } from 'react-hook-form'
import { usePage } from '../../hooks'
import Button from '../assets/button'
import Input from '../assets/input'
import { emailCheck, registerRequest } from '../../functions'
import ErrorMessage from '../assets/errorMessage'
import { JoinForm } from '../../interfaces'
import { useNavigate } from 'react-router-dom'

export default function Join() {
  usePage('join')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>()

  const successRegister = () => {
    alert('회원가입을 축하드립니다.')
    navigate('/login')
  }

  return (
    <form
      onSubmit={handleSubmit(registerRequest(successRegister))}
      className='flex flex-col items-center h-screen gap-5 px-4 pt-16 w-full'
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
            required: '이름을 입력해주세요.',
          })}
          placeholder='이름'
          type='text'
          label='이름'
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
