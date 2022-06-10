import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Page } from '../interfaces'
import { RootState } from './configStore'

interface AppState {
  currentPage: Page
}

export const initialState: AppState = {
  currentPage: 'home',
}

export const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setPage } = slice.actions
export const getCurrentPage = (state: RootState) => state.currentPage
export default slice.reducer
