import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useEffect, useState } from 'react'
import { applyTheme, getStoredTheme } from './lib/theme.js'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import RequireAdmin from './admin/RequireAdmin.jsx'
import AdminShell from './admin/AdminShell.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminProjects from './admin/AdminProjects.jsx'
import AdminMessages from './admin/AdminMessages.jsx'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const t = getStoredTheme()
    setTheme(t)
    applyTheme(t)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-agency">
              <Navbar theme={theme} onToggleTheme={toggleTheme} />
              <main>
                <Home />
              </main>
              <Footer />
            </div>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminShell />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
