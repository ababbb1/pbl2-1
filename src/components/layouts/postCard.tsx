import { PencilAltIcon, TrashIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { cls, getItemsFromDateObject, getUserInfo, urlToFile } from '../../functions/utils'
import { IPost } from '../../interfaces/app'
import {
  apiErrorHandler,
  APP_DOMAIN,
  authHeaders,
  contentTypeHeaders,
  fetchItem,
  fetchList,
} from '../../functions/requests'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../store/configStore'

interface PostCardProps {
  item: IPost
}

export default function PostCard(props: PostCardProps) {
  const div = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLSpanElement>(null)
  const user = getUserInfo()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [item, setItem] = useState<IPost>(props.item)
  const t = getItemsFromDateObject(new Date(item.createdAt))

  useEffect(() => {
    const pre = div.current?.firstChild
    const str = pre?.textContent
    if (item.layout === 'default' && str && str.length > 22) {
      pre ? (pre.textContent = str.substring(0, 22) + ' ...') : null
      span.current ? span.current.classList.remove('hidden') : null
    }
    fetchItem(props.item.postId)
      .then((i) => {
        setItem({
          ...item,
          likeByMe: i.likeByMe,
          likeCount: i.likeCount,
          userId: i.userId,
        })
      })
  }, [])

  const handlePostDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      axios({
        method: 'delete',
        url: `${APP_DOMAIN}/api/post/${item.postId}`,
        headers: Object.assign(contentTypeHeaders, authHeaders),
      })
        .then(async () => {
          await fetchList(dispatch)
          alert('게시글이 삭제되었습니다.')
          navigate('/')
        })
        .catch(apiErrorHandler)
    }
  }

  const handleLikeBtn = () => {
    axios({
      method: 'post',
      url: `${APP_DOMAIN}/api/post/${item.postId}/like`,
      headers: Object.assign(contentTypeHeaders, authHeaders),
    })
      .then(async () => {
        fetchItem(item.postId)
          .then((i) => {
            setItem({
              ...item,
              likeByMe: i.likeByMe,
              likeCount: i.likeCount,
              userId: i.userId,
            })
          })
      })
      .catch(apiErrorHandler)
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
              <PencilAltIcon className='w-6 h-6 text-theme1 hover:cursor-pointer' />
            </div>
            <div onClick={handlePostDelete}>
              <TrashIcon className='w-6 h-6 text-theme1 hover:cursor-pointer' />
            </div>
          </div>
        ) : null}
      </div>

      <div className={cls('flex', item.layout === 'default' ? 'flex-col' : item.layout === 'left' ? 'flex-row-reverse': '')}>
        <div
          className={cls(
            'p-3 text-sm text-gray-800 flex w-full'
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
          {item.likeByMe ? (
            <HeartIconSolid
              className='w-6 h-6 text-red-500 hover:cursor-pointer'
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
