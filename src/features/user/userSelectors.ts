import type { RootState } from '../../app/store/store'

export const selectUserState = (state: RootState) => state.user
export const selectIsInitialized = (state: RootState) => state.user.isInitialized
