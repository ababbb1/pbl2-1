import { BellIcon, UserIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentPage } from '../../store/reducer'
import { useAuth } from '../../hooks'
import Input from '../assets/input'

export default function Nav() {
  const page = useSelector(getCurrentPage)
  const navigate = useNavigate()

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-12 bg-theme1 flex items-center justify-between px-4 shadow-sm z-50 lg:hidden'>
        <div className='relative w-8'>
          {page === 'home' ? (
            useAuth() && (
              <>
                <BellIcon className='w-8 h-8 text-white hover:cursor-pointer' strokeWidth='1.2' />
                <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full flex items-center justify-center w-4 h-4 text-[0.5rem]'>
                  10
                </div>
              </>
            )
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
            <Link to={'/mypage'}>
              <UserIcon className='w-8 h-8 text-white' strokeWidth='1.2' />
            </Link>
          ) : null}
        </div>
      </div>

      <div className='fixed top-0 left-0 w-full h-16 bg-white hidden lg:flex items-center justify-between px-6 shadow-md z-50 '>
        <div className='flex items-center gap-8'>
          <Link to={'/'}>
            <div className='font-semibold text-2xl text-theme1 select-none'>항해99</div>
          </Link>
          {page === 'home' && (
            <Link to={'/posting'}>
              <input
                type='text'
                placeholder='무슨 생각을 하고 계신가요?'
                className='h-10 w-80 border border-gray-400 rounded-full p-3 focus:outline-theme1'
              />
            </Link>
          )}
        </div>
        <div className='flex items-center gap-5'>
          <div className='relative w-8'>
            {useAuth() && (
              <>
                <BellIcon className='w-8 h-8 text-theme1' strokeWidth='1.2' />
                <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full flex items-center justify-center w-4 h-4 text-[0.5rem]'>
                  10
                </div>
              </>
            )}
          </div>
          <div className=''>
            {useAuth() ? (
              <Link to={'/mypage'}>
                <UserIcon className='w-8 h-8 text-theme1' strokeWidth='1.2' />
              </Link>
            ) : (
              page === 'home' && (
                <Link to={'/login'}>
                  <button className='w-24 h-10 border bg-theme1 text-white rounded-full'>
                    로그인
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
