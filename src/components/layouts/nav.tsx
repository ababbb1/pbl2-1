import { BellIcon, UserIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentPage } from '../../store/reducer'

export default function Nav() {
  const page = useSelector(getCurrentPage)
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 w-full h-12 bg-theme1 flex items-center justify-between px-4 shadow-sm z-50'>
      <div className='relative w-8'>
        {page === 'home' ? (
          <>
            <BellIcon className='w-8 h-8 text-white hover:cursor-pointer' strokeWidth='1.2' />
            <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full flex items-center justify-center w-4 h-4 text-[0.5rem]'>
              10
            </div>
          </>
        ) : (
          <ChevronLeftIcon
            className='w-7 h-7 text-white hover:cursor-pointer'
            strokeWidth='1.5'
            onClick={() => navigate(-1)}
          />
        )}
      </div>

      <Link to={'/'}>
        <div className='font-semibold text-lg text-white select-none'>항해99</div>
      </Link>

      <div className='w-8 h-8'>
        {page === 'home' ? (
          <Link to={'/login'}>
            <UserIcon className='w-8 h-8 text-white' strokeWidth='1.2' />
          </Link>
        ) : null}
      </div>
    </div>
  )
}
