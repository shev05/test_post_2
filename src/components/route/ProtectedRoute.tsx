import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../shared/constants/route/routes'

const ProtectedRoute = () => {
  const hasRefreshToken = localStorage.getItem('refresh_token')
  console.log(hasRefreshToken)

  if (!hasRefreshToken)
    return (
      <Navigate
        to={PATHS.LOGIN}
        replace
      />
    )

  return <Outlet />
}

export default ProtectedRoute
