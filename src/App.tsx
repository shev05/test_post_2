import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Login from './pages/login/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/*"
          element={<Home />}
        />
      </Routes>
    </Router>
  )
}

export default App
