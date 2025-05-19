import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Login from './pages/login/LoginPage'
import { PATHS } from './shared/constants/route/routes'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={PATHS.LOGIN}
          element={<Login />}
        />
        <Route
          path={PATHS.HOME}
          element={<Home />}
        />
      </Routes>
    </Router>
  )
}

export default App
