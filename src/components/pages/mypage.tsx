import { useNavigate } from 'react-router-dom'
import { useSetPage } from '../../hooks'
import Button from '../assets/button'

export default function Mypage() {
  useSetPage('mypage')
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('user')
    navigate('../', { replace: true })
  }

  return (
    <div className='w-full flex justify-center py-16'>
      <div className='w-24'>
        <Button
          onClick={logoutHandler}
          text='로그아웃'
          style='h-8 text-theme1 text-sm border border-theme1'
        />
      </div>
    </div>
  )
}
