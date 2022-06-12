import { useSetPage } from '../../hooks'
import FloatingButton from '../assets/floatingButton'
import PostCard from '../layouts/postCard'
import { PencilIcon } from '@heroicons/react/outline'

export default function PostList() {
  useSetPage('home')
  return (
    <>
      <div className='flex flex-col gap-3 w-full bg-gray-200'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <PostCard key={i} />
        ))}
      </div>
      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </>
  )
}
