import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Page } from '../interfaces/app'
import { setPage } from '../store/reducer'

export function useSetPage(page: Page) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage(page))
  }, [])
}

export function useAuth() {
  // const token = useSelector(getToken)
  // return token
  return localStorage.getItem('token')
}
