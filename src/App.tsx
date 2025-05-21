import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast'

import { ROUTES } from './shared/constants/route/routes-config'

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
        {ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
