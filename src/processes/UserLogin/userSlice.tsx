import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  email: string | null
  token: string | null
  isRefreshing: boolean
  isInitialized: boolean
}

const initialState: UserState = {
  email: null,
  token: localStorage.getItem('refresh_token') || null,
  isRefreshing: false,
  isInitialized: false,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
    },
    RemoveUser(state) {
      state.email = null
    },
    SetRefreshing: (state, action) => {
      state.isRefreshing = action.payload
    },
    SetInitialized(state, action) {
      state.isInitialized = action.payload
    },
  },
})

export const { SetUser, RemoveUser, SetRefreshing, SetInitialized } = userReducer.actions

export default userReducer.reducer
