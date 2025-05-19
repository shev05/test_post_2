import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { api } from '../../services/api/api'
import rootReducer from './commonReducers/root'

const middlewares = [api.middleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
