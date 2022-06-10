import Button from '../assets/button'
import { useForm } from 'react-hook-form'
import { usePage } from '../../hooks'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import { cls } from '../../functions'
import ErrorMessage from '../assets/errorMessage'
import React, { useEffect, useState } from 'react'

interface PostForm {
  content: string
  image: string
}

export default function Posting() {
  usePage('posting')

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<PostForm>()
  const [previewImg, setPreviewImg] = useState('')
  const images = watch('image')

  useEffect(() => {
    if (images && images.length > 0) {
      const file: any = images[0]
      setPreviewImg(URL.createObjectURL(file))
      console.log(images)
    }
  }, [images])

  const onValid = (data: PostForm) => {
    console.log(data)
    alert('upload valid')
  }

  const handleResetBtn = () => {
    setPreviewImg('')
    resetField('image')
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center gap-6 px-4 py-16 w-full'
    >
      <textarea
        placeholder='무슨 생각을 하고 계신가요?'
        className={cls(
          'w-full h-48 resize-none p-2 border rounded-md',
          errors.content
            ? 'border-red-400 focus:outline-red-400'
            : 'border-gray-300 focus:outline-gray-500',
        )}
        {...register('content', {
          required: true,
        })}
      />

      <div className='w-full border border-gray-300 rounded-md p-2'>
        <div className='w-full relative'>
          {previewImg ? (
            <>
              <img src={previewImg} alt='preview-img' className='w-full' />
              <div
                onClick={handleResetBtn}
                className='absolute w-7 h-7 top-2 right-2 bg-slate-200 rounded-full shadow-sm flex justify-center items-center hover:cursor-pointer'
              >
                <XIcon className='w-6 h-6 text-slate-600' />
              </div>
            </>
          ) : (
            <label
              htmlFor='file'
              className='w-full h-32 rounded-md bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer'
            >
              <span className='font-semibold text-gray-700 mt-0.5 select-none'>사진 추가</span>
              <PlusIcon className='w-5 h-5 text-gray-700' />
            </label>
          )}
        </div>
        <input
          id='file'
          type='file'
          className='hidden'
          accept='image/*'
          {...register('image', {
            required: '이미지를 업로드해주세요.',
          })}
        />
      </div>
      <ErrorMessage message={errors.image?.message} />

      <Button text='게시' type='submit' style='text-white bg-theme1 h-12 mt-4' />
    </form>
  )
}
