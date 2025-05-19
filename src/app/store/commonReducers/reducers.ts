import userReducer from '../../../processes/UserLogin/userSlice'
import { api } from '../../../services/api/api'

export const reducers = {
  user: userReducer,
  [api.reducerPath]: api.reducer,
}
