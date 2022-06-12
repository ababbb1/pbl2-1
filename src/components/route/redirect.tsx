import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks'

interface RedirectProps {
  children: JSX.Element
  type: 'private' | 'public'
}

const Redirect = ({ children, type }: RedirectProps) =>
  type === 'private' ? (
    useAuth() ? (
      children
    ) : (
      <Navigate to='/login' state={{ from: useLocation().pathname }} replace />
    )
  ) : // type === 'public'
  !useAuth() ? (
    children
  ) : (
    <Navigate to='/' state={{ from: useLocation().pathname }} replace />
  )

export default Redirect
