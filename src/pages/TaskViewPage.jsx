import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskViewPage = () => {
  const { taskId } = useParams();
  const { tasks, updateTask } = useTasks();
  const navigate = useNavigate();
  const { colors, font } = useTheme();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  // Carrega a tarefa
  useEffect(() => {
    const foundTask = tasks.find(t => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setEditedDescription(foundTask.description || '');
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  }, [taskId, tasks, navigate]);

  // Sincroniza a descrição local sempre que a tarefa muda
  useEffect(() => {
    if (task) {
      setEditedDescription(task.description || '');
    }
  }, [task]);

  const handleSave = () => {
    // 1. Atualiza o contexto (id + campos a alterar)
    updateTask(task.id, { description: editedDescription });

    // 2. Atualiza o state local para re-render imediato
    setTask(prev => ({ ...prev, description: editedDescription }));

    // 3. Sai do modo de edição
    setIsEditing(false);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '60px auto',
      padding: '30px',
      backgroundColor: colors.cardBackground,
      color: colors.text,
      borderRadius: '10px',
      boxShadow: colors.shadow,
      fontFamily: font,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    field: {
      marginBottom: '15px',
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    value: {
      marginLeft: '8px',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '10px',
      borderRadius: '6px',
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      fontFamily: font,
      resize: 'vertical',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: '600',
    },
    saveButton: {
      backgroundColor: colors.primary,
      color: '#fff',
    },
    editButton: {
      backgroundColor: colors.primary,
      color: colors.text,
    },
    backButton: {
      backgroundColor: 'transparent',
      border: `1px solid ${colors.border}`,
      color: colors.text,
    },
  };

  if (loading) return <div style={{ color: colors.text }}>Carregando...</div>;
  if (!task)   return <div style={{ color: colors.text }}>Tarefa não encontrada</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Detalhes da Tarefa</h1>
      
      <div style={styles.field}>
        <span style={styles.label}>Título:</span>
        <span style={styles.value}>{task.name}</span>
      </div>
      
      <div style={styles.field}>
        <span style={styles.label}>Tipo:</span>
        <span style={styles.value}>{task.type}</span>
      </div>
      
      <div style={styles.field}>
        <span style={styles.label}>Prioridade:</span>
        <span style={styles.value}>{task.priority}</span>
      </div>
      
      <div style={styles.field}>
        <span style={styles.label}>Deadline:</span>
        <span style={styles.value}>{task.deadline}</span>
      </div>
      
      <div style={styles.field}>
        <span style={styles.label}>Status:</span>
        <span style={styles.value}>{task.status}</span>
      </div>
      
      <div style={styles.field}>
        <span style={styles.label}>Descrição:</span>
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={styles.textarea}
            placeholder="Adicione uma descrição detalhada..."
          />
        ) : (
          <div style={styles.value}>
            {task.description || 'Nenhuma descrição adicionada'}
          </div>
        )}
      </div>

      <div style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Salvar
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              style={{ ...styles.button, ...styles.backButton }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              style={{ ...styles.button, ...styles.editButton }}
            >
              {task.description
                ? 'Editar Descrição'
                : 'Adicionar Descrição'}
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              style={{ ...styles.button, ...styles.backButton }}
            >
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskViewPage;
