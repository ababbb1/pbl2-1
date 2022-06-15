import { useLocation, useNavigate } from 'react-router-dom'
import { IPost } from '../../interfaces/app'
import PostCard, { PostCardProps } from './postCard'
import { XIcon } from '@heroicons/react/outline'

export default function PostCardModal({ item }: { item: IPost }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        navigate(-1)
      }}
      className='fixed z-50 top-0 left-0 w-full h-full bg-[#00000090] flex justify-center items-center'
    >
      <div className='absolute top-4 right-4 hidden'>
        <XIcon
          className='text-gray-200 w-8 h-8 hover:cursor-pointer'
          onClick={() => {
            navigate(-1)
          }}
        />
      </div>
      <PostCard item={item} isModal={true} />
    </div>
  )
}
