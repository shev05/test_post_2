import { PATHS } from './routes'
import Login from '../../../pages/login/LoginPage'
import Home from '../../../pages/Home/Home'
import { Post } from '../../../pages/Post/Post'

export const ROUTES = [
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.HOME,
    element: <Home />,
  },
  {
    path: PATHS.POST,
    element: <Post />,
  },
]
