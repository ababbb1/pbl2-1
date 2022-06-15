import { PencilAltIcon, TrashIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import axios, { AxiosResponse } from 'axios'
import { cls, getItemsFromDateObject, getUserInfo, urlToFile } from '../../functions/utils'
import { IPost } from '../../interfaces/app'
import {
  apiErrorHandler,
  APP_DOMAIN,
  authHeaders,
  contentTypeHeaders,
  getPostRequest,
} from '../../functions/requests'
import { useDispatch } from 'react-redux'

export default function PostCard({ item }: { item: IPost }) {
  const div = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLSpanElement>(null)
  const user = getUserInfo()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const t = getItemsFromDateObject(new Date(item.createdAt))

  useEffect(() => {
    const pre = div.current?.firstChild
    const str = pre?.textContent
    if (str && str.length > 22) {
      pre ? (pre.textContent = str.substring(0, 22) + ' ...') : null
      span.current ? span.current.classList.remove('hidden') : null
    }
  }, [])

  const handlePostDelete = () => {
    axios({
      method: 'delete',
      url: `${APP_DOMAIN}/api/post/${item.postId}`,
      headers: Object.assign(contentTypeHeaders, authHeaders),
    })
      .then(() => {
        alert('게시글이 삭제되었습니다.')
        navigate('/')
      })
      .catch(apiErrorHandler)
      getPostRequest(dispatch)
  }

  const handleLikeBtn = () => {
    axios({
      method: 'post',
      url: `${APP_DOMAIN}/api/post/${item.postId}/like`,
      headers: Object.assign(contentTypeHeaders, authHeaders),
    })
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch(apiErrorHandler)
      getPostRequest(dispatch)
  }

  return (
    <div className='bg-white border border-slate-100'>
      <div className='flex justify-between p-3 border-b border-b-slate-100'>
        <div className='flex gap-3 items-center'>
          <div className='bg-slate-700 w-10 h-10 rounded-full'></div>
          <div className='flex flex-col gap-0.5'>
            <span className='font-semibold'>{item.nickname}</span>
            <span className='text-xs text-gray-400'>{`${t.notThisYearKor} ${t.month}월 ${t.date}일 ${t.ampmKor}`}</span>
          </div>
        </div>
        {user?.userId === item.userId ? (
          <div className='flex items-center gap-3'>
            <div
              onClick={() => {
                navigate(`/modify/${item.postId}`, { state: item })
              }}
            >
              <PencilAltIcon className='w-6 h-6 text-theme1' />
            </div>
            <div onClick={handlePostDelete}>
              <TrashIcon className='w-6 h-6 text-theme1' />
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <div
          className={cls(
            'p-3 text-sm text-gray-800 flex',
            item.layout === 'default' ? 'flex-col' : item.layout === 'right' ? 'justify-end' : '',
          )}
        >
          <div ref={div} className='flex'>
            <pre className='break-words whitespace-pre-wrap'>{item.content}</pre>
            <span ref={span} className='hidden ml-2 font-semibold text-gray-500'>
              더보기
            </span>
          </div>
        </div>
        <div className='w-full h-72 md:h-80'>
          <img className='w-full h-full' src={`${APP_DOMAIN}/images/${item.image}`} />
        </div>
      </div>

      <div className='flex justify-between items-center p-3 border-t border-t-slate-100'>
        <span className='text-sm'>{`좋아요 ${item.likeCount}개`}</span>
        <span>
          {item.likeByMe === 'true' ? (
            <HeartIconSolid
              className='w-6 h-6 text-red-400 hover:cursor-pointer'
              onClick={handleLikeBtn}
            />
          ) : (
            <HeartIcon
              className='w-6 h-6 text-gray-600 hover:cursor-pointer'
              onClick={handleLikeBtn}
            />
          )}
        </span>
      </div>
    </div>
  )
}
