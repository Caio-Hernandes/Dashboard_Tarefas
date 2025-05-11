import React, { useEffect, useContext } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import ThemeContext, { useTheme, ThemeProvider } from '../context/ThemeContext';


const TaskCreatePage = () => {
  const { clearTaskToEdit } = useTasks();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    clearTaskToEdit();
  }, []);

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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Criar Nova Tarefa</h1>
      <TaskForm />
    </div>
  );
};

export default TaskCreatePage;