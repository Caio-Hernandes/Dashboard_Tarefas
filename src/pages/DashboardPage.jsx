import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { clearTaskToEdit, taskToEdit } = useTasks();
  
  
  
  const { font, colors, isDarkMode } = useTheme();
 

  const handleToggleForm = () => {
    clearTaskToEdit();
    setShowForm(prev => !prev);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    clearTaskToEdit();
  };

  return (
    <div className="app" style={{ fontFamily: font }}>
      <div className="header" style={{ backgroundColor: colors.Background, color: colors.navbarText, marginBottom: '30px', borderRadius: '8px', }}>
        <h1 style={{'textAlign': 'center', fontSize: '36px', fontWeight: 'bold' }}>Dashboard</h1>
        
      </div>

      {showForm && (
        <div
          className="form-container"
          style={{
            marginBottom: '30px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: isDarkMode ? '#222222' : 'rgb(248, 249, 253)',
            width: '1400px',
            margin: '0 auto',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2>{taskToEdit ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</h2>
          <TaskForm onSuccess={handleFormSuccess} />
        </div>
      )}
      <br/><br/>

      <TaskList
  showForm={showForm}
  onToggleForm={handleToggleForm}
/>

    </div>
  );
};

export default DashboardPage;
