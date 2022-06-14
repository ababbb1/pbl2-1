import { PencilAltIcon, TrashIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { cls, getUserInfo } from '../../functions'
import { IPost } from '../../interfaces'
import { likeRequest, postDeleteRequest } from '../../functions/requests'
import { AxiosResponse } from 'axios'

export default function PostCard({ item }: { item: IPost }) {
  const div = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLSpanElement>(null)
  const user = getUserInfo()
  const navigate = useNavigate()

  useEffect(() => {
    const pre = div.current?.firstChild
    const str = pre?.textContent
    if (str && str.length > 22) {
      pre ? (pre.textContent = str.substring(0, 22) + ' ...') : null
      span.current ? span.current.classList.remove('hidden') : null
    }
  }, [])

  const handlePostDelete = () => {
    postDeleteRequest(item.postId)((res: AxiosResponse) => {
      alert('게시글이 삭제되었습니다.')
      navigate('/', { replace: true })
    })
  }

  const handleLikeBtn = () => {
      likeRequest(item.postId)((res: AxiosResponse) => {
          console.log(res)
          navigate('/')
        })
  }

  return (
    <div className='bg-white border border-slate-100'>
      <div className='flex justify-between p-3 border-b border-b-slate-100'>
        <div className='flex gap-3 items-center'>
          <div className='bg-slate-700 w-10 h-10 rounded-full'></div>
          <div className='flex flex-col gap-0.5'>
            <span className='font-semibold'>홍길동</span>
            <span className='text-xs text-gray-400'>6월 10일 오후 03:22</span>
          </div>
        </div>
        {user?.id === item.userId ? (
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
        <div className='bg-slate-700 w-full h-72 md:h-80'></div>
      </div>

      <div className='flex justify-between items-center p-3 border-t border-t-slate-100'>
        <span className='text-sm'>좋아요 0개</span>
        <span>
          {item.likeByMe === 'true' ? (
            <HeartIconSolid className='w-6 h-6 text-red-400' onClick={handleLikeBtn} />
          ) : (
            <HeartIcon className='w-6 h-6 text-gray-600' onClick={handleLikeBtn} />
          )}
        </span>
      </div>
    </div>
  )
}
