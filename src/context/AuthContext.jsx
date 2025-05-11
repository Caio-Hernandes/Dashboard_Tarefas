// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// Componente Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Efeito para carregar usuário ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (storedUser && isLoggedIn) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar usuário', error);
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('isLoggedIn');
      }
    }

    setLoading(false);
  }, []);

  // Função de login
  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  // Função de registro
  const register = (username, password) => {
    console.log('Iniciando registro...');

    if (!username?.trim() || !password?.trim()) {
      console.error('Username e password são obrigatórios');
      throw new Error('Preencha todos os campos');
    }

    const newUser = {
      id: Date.now(),
      username: username.trim(),
      password: password.trim(),
      createdAt: new Date().toISOString()
    };

    // Pega lista atual de usuários
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Verifica se o usuário já existe
    if (storedUsers.some((user) => user.username === newUser.username)) {
      throw new Error('Esse nome de usuário já está em uso');
    }

    // Adiciona o novo usuário
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log('Usuário registrado com sucesso');
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    navigate('/login');
  };

  // Valor do contexto
  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('useAuth foi chamado fora do AuthProvider');
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};

export default AuthProvider;