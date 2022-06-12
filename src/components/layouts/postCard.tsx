import { PencilAltIcon, TrashIcon, HeartIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentPage } from '../../store/reducer'

export default function PostCard() {
  const page = useSelector(getCurrentPage)

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
        <div className='flex items-center gap-3'>
          <div>
            <PencilAltIcon className='w-6 h-6 text-theme1' />
          </div>
          <div>
            <TrashIcon className='w-6 h-6 text-theme1' />
          </div>
        </div>
      </div>

      <div>
        <div className='p-3 text-sm text-gray-800'>
          <p>안녕하세요</p>
        </div>
        {page === 'detail' ? (
          <div className='bg-slate-700 w-full h-72 md:h-80'></div>
        ) : (
          <Link to={'/post'}>
            <div className='bg-slate-700 w-full h-72 md:h-80'></div>
          </Link>
        )}
      </div>

      <div className='flex justify-between items-center p-3 border-t border-t-slate-100'>
        <span className='text-sm'>좋아요 0개</span>
        <span>
          <HeartIcon className='w-6 h-6 text-gray-600' />
        </span>
      </div>
    </div>
  )
}
