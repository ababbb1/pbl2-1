import { useForm, Validate } from 'react-hook-form'
import { usePage } from '../../hooks'
import Button from '../assets/button'
import Input from '../assets/input'
import { Link } from 'react-router-dom'
import { emailCheck } from '../../functions'
import ErrorMessage from '../assets/errorMessage'

interface JoinForm {
  name: string
  email: string
  password: string
  passwordCheck: string
}

export default function Join() {
  usePage('join')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>()

  const onValid = (data: JoinForm) => {
    alert('join valid')
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
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
          register={register('name', {
            required: '이름을 입력해주세요.',
          })}
          placeholder='이름'
          type='text'
          label='이름'
          invalid={errors.name}
        />
        <ErrorMessage message={errors.name?.message} />
      </div>

      <div className='mt-6 flex flex-col gap-2 w-full'>
        <Button type='submit' text='가입하기' style='bg-theme1 text-white h-12' />
      </div>
    </form>
  )
}
