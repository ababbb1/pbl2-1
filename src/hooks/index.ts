import { useEffect } from 'react'
import { Page } from '../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, setPage } from '../store/reducer'

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
