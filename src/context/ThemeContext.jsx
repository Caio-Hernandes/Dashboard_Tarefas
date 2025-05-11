import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto de tema
const ThemeContext = createContext(null);

// Provedor do ThemeContext
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Aplicando as classes no body para o tema
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }

    // Salvando a preferência no localStorage
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const colors = {
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#333333',
    primary: isDarkMode ? '#4CAF50' : '#2196F3',
    secondary: isDarkMode ? '#FFC107' : '#9C27B0',
    danger: '#f44336',
    navbarBg: isDarkMode ? '#222222' : 'rgb(248, 249, 253)',
    navbarText: isDarkMode ? '#ffffff' : '#333333',
    cardBackground: isDarkMode ? '#2b2b2b' : '#f8f9fa',
    inputBackground: isDarkMode ? '#333333' : '#ffffff',
    border: isDarkMode ? '#404040' : '#e0e0e0',
    shadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <ThemeContext.Provider value={{
      colors,
      font: 'Arial, sans-serif',
      isDarkMode,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme deve ser usado dentro de <ThemeProvider>');
  }
  return context;
};

export default ThemeContext;

