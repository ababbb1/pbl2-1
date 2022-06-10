import { useEffect } from 'react'
import { Page } from '../interfaces'
import { useDispatch } from 'react-redux'
import { setPage } from '../store/reducer'

export function usePage(page: Page) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage(page))
  }, [])
}
