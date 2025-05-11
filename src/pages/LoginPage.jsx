import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { colors, font } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  const styles = {
    container: {
      maxWidth: '420px',
      margin: '80px auto',
      padding: '40px',
      backgroundColor: colors.cardBackground,
      color: colors.text,
      borderRadius: '16px',
      boxShadow: `0 10px 25px ${colors.shadow}`,
      fontFamily: font,
      border: `1px solid ${colors.border}`,
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '600',
      color: colors.primary,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
    },
    input: {
      padding: '14px 16px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      fontSize: '15px',
      transition: 'border 0.3s ease',
    },
    inputFocus: {
      outline: 'none',
      border: `2px solid ${colors.primary}`,
    },
    error: {
      color: colors.danger,
      fontSize: '14px',
      margin: '-10px 0 10px',
      textAlign: 'center',
    },
    button: {
      padding: '14px',
      borderRadius: '8px',
      backgroundColor: colors.primary,
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px',
    },
    secondaryButton: {
      padding: '14px',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: colors.text,
      border: `1px solid ${colors.border}`,
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '20px',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0',
      color: colors.textSecondary,
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: colors.border,
    },
    dividerText: {
      padding: '0 10px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo de volta</h1>
      
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={(e) => e.target.style = styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={(e) => e.target.style = styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryDark}
          onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
        >
          Entrar
        </button>
      </form>

      <div style={styles.divider}>
        <div style={styles.dividerLine}></div>
        <span style={styles.dividerText}>ou</span>
        <div style={styles.dividerLine}></div>
      </div>

          <button 
  onClick={() => navigate('/register')} 
  style={{
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: colors.text,
    border: `1px solid ${colors.border}`,
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    marginTop: '20px',
    fontFamily: font,
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = colors.hoverBackground;
    e.target.style.color = colors.primary;
    e.target.style.borderColor = colors.primary;
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = colors.text;
    e.target.style.borderColor = colors.border;
  }}
>
  Não tem uma conta? Cadastre-se
</button>
    </div>
  );
};

export default LoginPage;