import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext'; 
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { FiFilter, FiX } from 'react-icons/fi';

const TaskList = ({ showForm, onToggleForm }) => {
  const { tasks = [], updateTaskStatus, removeTask } = useTasks();
  const { colors, isDarkMode } = useTheme(); 

  const [filters, setFilters] = useState({ tags: [], type: '', priority: '' });
  const [showFilters, setShowFilters] = useState(false);
  

  // Configurações
  const allOptions = {
    types: ['trabalho', 'pessoal', 'estudo'],
    priorities: ['alta', 'media', 'baixa'],
    statuses: ['pendente', 'progresso', 'concluida']
  };

  // Funções de filtragem e agrupamento
  const filterTasks = () => {
    return tasks.filter(task => {
      if (!task) return false;

      const taskTags = Array.isArray(task.tags) ? task.tags : [];
      if (filters.tags.length > 0 && !filters.tags.every(tag => taskTags.includes(tag))) return false;
      if (filters.type && task.type !== filters.type) return false;
      if (filters.priority && task.priority !== filters.priority) return false;

      return true;
    });
  };

  const groupTasksByStatus = (tasks) => {
    const grouped = {
      pendente: [],
      progresso: [],
      concluida: []
    };

    tasks.forEach(task => {
      const status = task?.status || 'pendente';
      if (grouped[status]) grouped[status].push(task);
    });

    return grouped;
  };

  // Manipuladores de eventos
  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    updateTaskStatus(taskId, status);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleOverlayClick = () => setShowFilters(false);
  const toggleFilters = () => setShowFilters(prev => !prev);
  const resetFilters = () => setFilters({ tags: [], type: '', priority: '' });
  const handleToggleForm = () => {
    clearTaskToEdit();
    setShowForm(prev => !prev);
  };

  // Variáveis computadas
  const filteredTasks = filterTasks();
  const tasksByStatus = groupTasksByStatus(filteredTasks);

  // Estilos
   const styles = {
    container: {
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: isDarkMode ? '#222222' : 'rgb(248, 249, 253)', 
      color: colors.text,
      minHeight: '100vh',
      borderRadius: '16px',
      
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '20px'
    },
    filterButton: {
      background: colors.primary, 
      color: colors.buttonText || '#fff', 
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: colors.primaryDark 
      }
    },
    newTaskButton: {
      background: showForm ? colors.danger : colors.primary, 
      color: colors.buttonText || '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: showForm ? colors.dangerDark : colors.primaryDark
      }
    },
    filterPanel: {
      position: 'fixed',
      top: 0,
      right: showFilters ? '0' : '-380px',
      width: '320px',
      height: '100vh',
      backgroundColor: colors.cardBackground, 
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      padding: '20px',
      transition: 'right 0.3s ease',
      zIndex: 100,
      overflowY: 'auto'
    },
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 99,
      display: showFilters ? 'block' : 'none'
    },
    columnsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      backgroundColor: isDarkMode ? '#222222' : 'rgb(248, 249, 253)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: colors.shadow,
      marginTop: '20px',
      transition: 'all 0.3s ease'
    },
    
    column: {
      backgroundColor: colors.cardBackground, 
      padding: '15px',
      borderRadius: '8px',
      minHeight: '70vh',
      boxShadow: colors.shadow,
      transition: 'all 0.3s ease'
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    }
  };

  if (!Array.isArray(tasks)) {
    return <div>Erro ao carregar tarefas.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Meu Planner</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={styles.filterButton} 
            onClick={toggleFilters}
            onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryDark}
            onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
          >
            {showFilters ? <FiX size={18} /> : <FiFilter size={18} />}
            {showFilters ? 'Fechar' : 'Filtrar'}
          </button>
          <button
            onClick={onToggleForm}
            style={styles.newTaskButton}
            onMouseOver={(e) => e.target.style.backgroundColor = showForm ? colors.dangerDark : colors.primaryDark}
            onMouseOut={(e) => e.target.style.backgroundColor = showForm ? colors.danger : colors.primary}
          >
            {showForm ? 'Cancelar' : '+ Nova Tarefa'}
          </button>
        </div>
      </div>

      <div style={styles.filterPanel}>
        <TaskFilter
          allOptions={allOptions}
          currentFilters={filters}
          onFilter={setFilters}
          onReset={resetFilters}
        />
      </div>

      {showFilters && <div style={styles.overlay} onClick={handleOverlayClick} />}

      <div style={styles.columnsContainer}>
        {allOptions.statuses.map(status => {
          const tasksForStatus = tasksByStatus[status] || [];

          const title = {
            pendente: 'Pendentes',
            progresso: 'Em Progresso',
            concluida: 'Concluídas'
          }[status];

          const color = {
            pendente: '#FF9800',
            progresso: '#2196F3',
            concluida: '#4CAF50'
          }[status];

          return (
            <div
              key={status}
              className="task-column"
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <h2 style={{
                color,
                textAlign: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: `2px solid ${color}`
              }}>
                {title}
                <span style={{ marginLeft: '8px', color: '#666', fontSize: '0.9em' }}>
                  ({tasksForStatus.length})
                </span>
              </h2>

              <div style={styles.taskList}>
                {tasksForStatus.map(task => (
                  task && (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <TaskItem
                        task={task}
                        onDelete={() => removeTask(task.id)}
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
