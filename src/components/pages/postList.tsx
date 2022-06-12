import { useSetPage } from '../../hooks'
import { FloatingButton, PostCard } from '../../components'
import { PencilIcon } from '@heroicons/react/outline'

export default function PostList() {
  useSetPage('home')
  return (
    <div className='w-full bg-gray-200 flex justify-center pb-16'>
      <div className='flex flex-col gap-3 w-full max-w-md'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <PostCard key={i} />
        ))}
      </div>
      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </div>
  )
}
