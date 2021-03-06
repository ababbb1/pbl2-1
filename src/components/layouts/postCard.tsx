import { PencilAltIcon, TrashIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { cls, getItemsFromDateObject, getUserInfo } from '../../functions/utils'
import { IPost } from '../../interfaces/app'
import {
  apiErrorHandler,
  APP_DOMAIN,
  authHeaders,
  contentTypeHeaders,
  fetchItem,
  fetchList,
} from '../../functions/requests'
import { useAppDispatch } from '../../store/configStore'
import { useAuth } from '../../hooks'

export interface PostCardProps {
  item: IPost
  isModal: boolean
}

const SUBSTR_COUNT = 22

export default function PostCard(props: PostCardProps) {
  const div = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLSpanElement>(null)
  const user = getUserInfo()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [item, setItem] = useState<IPost>(props.item)
  const t = getItemsFromDateObject(new Date(item.createdAt))
  const location = useLocation()
  const [isModal, setIsModal] = useState(props.isModal)

  useEffect(() => {
    if (useAuth())
      fetchItem(props.item.postId).then((i) => {
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
    if (!useAuth()) {
      alert('로그인 후 이용해주세요.')
      navigate('/login', { replace: true })
      return
    }
    axios({
      method: 'post',
      url: `${APP_DOMAIN}/api/post/${item.postId}/like`,
      headers: Object.assign(contentTypeHeaders, authHeaders),
    })
      .then(async () => {
        fetchItem(item.postId).then((i) => {
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
    <div className={cls(isModal ? 'md:max-h-[50rem] md:h-full md:max-w-[40rem] lg:h-full lg:max-w-[60rem] lg:max-h-[50rem]' : 'h-[430px]', 'bg-white border border-slate-100 w-full max-w-[25rem]')}>
      <div className='flex h-15 justify-between p-2 border-b border-b-slate-100'>
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

      <div
        className={cls(
          'flex h-full', isModal ? 'md:max-h-[40rem] lg:max-h-[80%]': 'max-h-[20rem]',
          item.layout === 'default' ? 'flex-col' : item.layout === 'left' ? 'flex-row-reverse' : '',
        )}
      >
        <div
          className={cls(
            'p-3 text-sm text-gray-800 flex w-full',
            item.layout === 'default' ? 'h-11' : 'max-w-[50%]',
          )}
        >
          <div ref={div} className='flex w-full'>
            <div className='w-full'>
              {
              !isModal ? item.content.split('\n').map((x, i) => {
                if (
                  i === 0 &&
                  item.layout === 'default' &&
                  x.length > SUBSTR_COUNT
                ) {
                  return (
                    <p key={x} className='hidden first:block w-full break-words'>
                      {x.substring(0, SUBSTR_COUNT) + ' ...'}
                      <Link
                        to={`/detail/${item.postId}`}
                        state={{ background: location, item: item }}
                      >
                        <span ref={span} className='ml-2 font-semibold text-gray-500'>
                          더보기
                        </span>
                      </Link>
                    </p>
                  )
                } else {
                  return (
                    <p key={x} className='break-words'>
                      {x}
                    </p>
                  )
                }
              }): <p className='break-words'>{item.content}</p>}
            </div>
          </div>
        </div>
        <div className='w-full h-full overflow-y-auto'>
          <Link to={`/detail/${item.postId}`} state={{ background: location, item: item }}>
            <img className='w-full h-full' src={`${APP_DOMAIN}/images/${item.image}`} />
          </Link>
        </div>
      </div>

      <div className='flex justify-between items-center p-3 border-t border-t-slate-100'>
        <span className='text-sm'>{`좋아요 ${item.likeCount || 0}개`}</span>
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
