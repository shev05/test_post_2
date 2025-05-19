import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Login from './pages/login/LoginPage'
import ProtectedRoute from './components/route/ProtectedRoute'
import { useAppDispatch } from './app/store/store'
import { useEffect } from 'react'
import { SetInitialized } from './processes/UserLogin/userSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SetInitialized(true))
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/*"
                element={<Home />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
