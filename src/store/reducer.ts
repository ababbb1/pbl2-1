import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Page } from '../interfaces'
import { RootState } from './configStore'

interface AppState {
  currentPage: Page
  token: string
}

export const initialState: AppState = {
  currentPage: 'home',
  token: '',
}

export const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setPage, setToken } = slice.actions
export const getCurrentPage = (state: RootState) => state.currentPage
export const getToken = (state: RootState) => state.token
export default slice.reducer
