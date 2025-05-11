import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TaskEditPage from './pages/TaskEditPage'
import TaskCreatePage from './pages/TaskCreatePage'
import Navbar from './components/Navbar'
import './App.css'
import TaskViewPage from './pages/TaskViewPage'
import { useAuth } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  const location = useLocation()

  return (
    <ThemeProvider>
      <div className="app">
        {/* Navbar será exibido em todas as rotas */}
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            } />
            <Route path="/tasks/edit/:taskId" element={
              <ProtectedRoutes>
                <TaskEditPage />
              </ProtectedRoutes>
            } />
            <Route path="/tasks/new" element={
              <ProtectedRoutes>
                <TaskCreatePage />
              </ProtectedRoutes>
            } />
            <Route path="/tasks/view/:taskId" element={
              <ProtectedRoutes>
                <TaskViewPage />
              </ProtectedRoutes>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <TaskProvider>
      {children}
    </TaskProvider>
  )
}

export default App
