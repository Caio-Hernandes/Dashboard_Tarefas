import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext' 
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { colors, isDarkMode, toggleTheme } = useTheme() 
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar" style={{ 
      backgroundColor: colors.navbarBg,
      color: colors.navbarText,
      borderRadius: "0% 0% 8px 8px",
    }}>
      <div className="navbar-brand">
        <Link to="/dashboard" style={{ color: colors.navbarText }}>
          Meu Planner
        </Link>
      </div>
      <br/>

      <div className="navbar-actions">
        <button 
  onClick={toggleTheme} 
  className="theme-toggle"
  style={{ 
    color: colors.navbarText, 
    fontFamily: "Inter, sans-serif",
    backgroundColor: colors.navbarBg,
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: colors.shadow
  }}
>
  {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
</button>


        {user ? (
          // Exibir para o usuário logado
          <>
            <span className="welcome-msg">Olá, {user.username}!</span>
            <button 
              onClick={handleLogout} 
              className="logout-btn"
              style={{
                color: colors.navbarText,
                backgroundColor: colors.navbarHover
              }}
            >
              Sair
            </button>
          </>
        ) : (
          // Exibir para o usuário não logado
          <>
            <Link 
              to="/login" 
              className="auth-link"
              style={{ color: colors.navbarText }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="auth-link"
              style={{ color: colors.navbarText }}
            >
              Registrar
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
