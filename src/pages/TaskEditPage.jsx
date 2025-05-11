import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import ThemeContext, { useTheme, ThemeProvider } from '../context/ThemeContext';


const TaskEditPage = () => {
  const { taskId } = useParams();
  const { tasks, setTaskToEdit } = useTasks();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        if (tasks.length > 0) {
          const task = tasks.find(t => t.id === taskId);
          if (!task) throw new Error('Task not found');
          setTaskToEdit(task);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, tasks]);

  if (loading) return <div style={{ color: theme.text }}>Carregando...</div>;

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '60px auto',
      padding: '30px',
      backgroundColor: theme.cardBackground,
      color: theme.text,
      borderRadius: '10px',
      boxShadow: theme.shadow,
      fontFamily: theme.font,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    backButton: {
      marginTop: '20px',
      padding: '10px 16px',
      background: theme.buttonSecondary,
      border: `1px solid ${theme.border}`,
      color: theme.buttonText,
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Editar Tarefa</h1>
      <TaskForm onSuccess={() => navigate('/dashboard')} />
      <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
        Voltar para o Dashboard
      </button>
    </div>
  );
};

export default TaskEditPage;
