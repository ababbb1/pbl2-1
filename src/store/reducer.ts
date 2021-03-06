import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPost, Page } from '../interfaces/app'
import { RootState } from './configStore'

interface AppState {
  currentPage: Page
  token: string
  postList: IPost[]
}

const initialState: AppState = {
  currentPage: 'home',
  token: '',
  postList: [],
}

const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setPostList: (state, action: PayloadAction<IPost[]>) => {
      state.postList = action.payload
    },
  },
})

export const { setPage, setToken, setPostList } = slice.actions
export const getCurrentPage = (state: RootState) => state.currentPage
export const getToken = (state: RootState) => state.token
export const getPostList = (state: RootState) => state.postList
export default slice.reducer
