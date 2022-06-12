import store, { RootState, AppDispatch } from './configStore'
import reduxReducer, { setPage, setToken, getCurrentPage, getToken } from './reducer'

export { store, reduxReducer, setPage, setToken, getCurrentPage, getToken }
export type { RootState, AppDispatch }
