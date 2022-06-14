import { useEffect } from 'react'
import { Page } from '../interfaces'
import { useDispatch } from 'react-redux'
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
