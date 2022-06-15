import { SubmitHandler, useForm } from 'react-hook-form'
import { useSetPage } from '../../hooks'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { cls } from '../../functions/utils'
import { IPost, LayoutType, PostForm } from '../../interfaces/app'
import SelectPostLayout from '../layouts/selectPostLayout'
import ErrorMessage from '../assets/errorMessage'
import Button from '../assets/button'
import {
  apiErrorHandler,
  APP_DOMAIN,
  authHeaders,
  contentTypeHeaders,
  fetchList,
} from '../../functions/requests'
import { useAppDispatch } from '../../store/configStore'

export default function Posting() {
  useSetPage('posting')

  const { register, handleSubmit, watch, resetField, setValue, getValues, formState } =
    useForm<PostForm>({ mode: 'onChange' })
  const [previewImg, setPreviewImg] = useState('')
  const { state }: any = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [layoutState, setLayoutState] = useState<LayoutType>('default')

  const contentResetBtn = useRef<HTMLDivElement>(null)

  const images = watch('images')
  const [contentResetBtnState, setContentResetBtnState] = useState<'flex' | 'hidden'>('flex')

  useEffect(() => {
    if (state) {
      setValue('content', state.content)
      setValue('layout', state.layout)
    }
    getValues('content') ? setContentResetBtnState('flex') : setContentResetBtnState('hidden')
  }, [])

  useEffect(() => {
    if (images && images.length > 0) {
      const file: any = images[0]
      setPreviewImg(URL.createObjectURL(file))
    }
  }, [images])

  const onValid: SubmitHandler<PostForm> = (data: PostForm) => {
    const path = state ? `post/${state.postId}` : 'post'

    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('image', data.images[0])
    formData.append('layout', data.layout)

    const onSuccess = async (word: string) => {
      await fetchList(dispatch)
      alert(`게시글이 ${word}되었습니다.`)
      navigate('/', { replace: true })
    }

    const cb = state ? onSuccess('수정') : onSuccess('등록')

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${APP_DOMAIN}/api/${path}`,
      data: formData,
      headers: Object.assign(contentTypeHeaders, authHeaders),
    }

    axios(config)
      .then(() => {
        cb
      })
      .catch(apiErrorHandler)
  }

  const handleImageResetBtn = () => {
    setPreviewImg('')
    resetField('images')
  }

  const handleContentResetBtn = () => {
    resetField('content')
    setContentResetBtnState('hidden')
  }

  const handleContentChange = () => {
    watch('content') ? setContentResetBtnState('flex') : setContentResetBtnState('hidden')
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center gap-6 px-4 py-16 w-full md:max-w-md'
    >
      <div className='w-full flex flex-col items-center gap-2'>
        <ErrorMessage message={formState.errors.layout?.message} />
        <SelectPostLayout
          register={register('layout', {
            required: '레이아웃을 선택해주세요.',
          })}
          setLayoutState={setLayoutState}
        />
      </div>

      <div
        className={cls(
          'flex gap-4 w-full min-h-[20rem]',
          layoutState === 'default' ? 'flex-col' : layoutState === 'left' ? 'flex-row-reverse' : '',
        )}
      >
        <div className='w-full relative'>
          <textarea
            placeholder='무슨 생각을 하고 계신가요?'
            className={cls(
              'w-full h-full min-h-[8rem] md:min-h-[12rem] resize-none py-5 px-7 border rounded-md',
              formState.errors.content
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
            className={cls(
              contentResetBtnState,
              'absolute w-5 h-5 top-2 right-2 bg-slate-200 rounded-full shadow-sm justify-center items-center hover:cursor-pointer',
            )}
          >
            <XIcon className='w-4 h-4 text-slate-600' />
          </div>
        </div>

        <div className='w-full border border-gray-300 rounded-md p-2'>
          <div className='w-full relative h-full'>
            {previewImg ? (
              <div className='h-full'>
                <img src={previewImg} alt='preview-img' className='w-full h-full rounded-md' />
                <div
                  onClick={handleImageResetBtn}
                  className='absolute w-5 h-5 top-2 right-2 bg-slate-200 rounded-full shadow-sm flex justify-center items-center hover:cursor-pointer'
                >
                  <XIcon className='w-4 h-4 text-slate-600' />
                </div>
              </div>
            ) : (
              <label
                htmlFor='file'
                className='w-full h-full min-h-[10rem] rounded-md bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer'
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
            {...register('images', {
              required: '이미지를 업로드해주세요.',
            })}
          />
          <ErrorMessage message={formState.errors.images?.message} />
        </div>
      </div>

      <Button text='게시' type='submit' style='text-white bg-theme1 h-12 mt-4' />
    </form>
  )
}
