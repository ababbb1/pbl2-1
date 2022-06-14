import { useForm } from 'react-hook-form'
import { useSetPage } from '../../hooks'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import { cls, postingRequest, postModifyRequest } from '../../functions'
import { ErrorMessage, SelectPostLayout, Button } from '../../components'
import React, { useEffect, useRef, useState } from 'react'
import { AxiosResponse } from 'axios'
import { PostForm } from '../../interfaces'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Posting() {
  useSetPage('posting')

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PostForm>({ mode: 'onChange' })
  const [previewImg, setPreviewImg] = useState('')
  const { state }: any = useLocation()
  const navigate = useNavigate()
  const contentResetBtn = useRef<HTMLDivElement>(null)
  const images = watch('image')

  useEffect(() => {
    if (state) {
      setValue('content', state.content)
      contentResetBtn.current?.classList.remove('hidden')
    }
  }, [])

  useEffect(() => {
    if (images && images.length > 0) {
      const file: any = images[0]
      setPreviewImg(URL.createObjectURL(file))
    }
  }, [images])

  const onValid = state
    ? postModifyRequest(state.postId)((res: AxiosResponse) => {
        console.log(state.postId)
        alert('게시글이 수정되었습니다.')
        navigate('/', { replace: true })
      })
    : postingRequest((res: AxiosResponse) => {
        alert('게시글이 등록되었습니다.')
        navigate('/', { replace: true })
      })

  const handleImageResetBtn = () => {
    setPreviewImg('')
    resetField('image')
  }

  const handleContentResetBtn = () => {
    resetField('content')
    contentResetBtn.current?.classList.add('hidden')
  }

  const handleContentChange = () => {
    getValues('content')
      ? contentResetBtn.current?.classList.remove('hidden')
      : contentResetBtn.current?.classList?.add('hidden')
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center gap-6 px-4 py-16 w-full md:max-w-md'
    >
      <div className='w-full flex flex-col items-center gap-2'>
        <ErrorMessage message={errors.layout?.message} />
        <SelectPostLayout
          register={register('layout', {
            required: '레이아웃을 선택해주세요.',
          })}
        />
      </div>

      <div className='w-full relative'>
        <textarea
          placeholder='무슨 생각을 하고 계신가요?'
          className={cls(
            'w-full h-48 resize-none py-5 px-7 border rounded-md',
            errors.content
              ? 'border-red-400 focus:outline-red-400'
              : 'border-gray-300 focus:outline-gray-500',
          )}
          {...register('content', {
            required: true,
            onChange: handleContentChange,
          })}
        />
        <div
          ref={contentResetBtn}
          onClick={handleContentResetBtn}
          className='hidden absolute w-5 h-5 top-2 right-2 bg-slate-200 rounded-full shadow-sm flex justify-center items-center hover:cursor-pointer'
        >
          <XIcon className='w-4 h-4 text-slate-600' />
        </div>
      </div>

      <div className='w-full border border-gray-300 rounded-md p-2'>
        <div className='w-full relative'>
          {previewImg ? (
            <>
              <img src={previewImg} alt='preview-img' className='w-full' />
              <div
                onClick={handleImageResetBtn}
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
