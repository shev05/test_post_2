import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Login from './pages/login/LoginPage'
import { PATHS } from './shared/constants/route/routes'
import { Toaster } from 'react-hot-toast'
import { Post } from './pages/Post/Post'

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route
          path={PATHS.LOGIN}
          element={<Login />}
        />
        <Route
          path={PATHS.HOME}
          element={<Home />}
        />
        <Route
          path={PATHS.POST}
          element={<Post />}
        />
      </Routes>
    </Router>
  )
}

export default App
