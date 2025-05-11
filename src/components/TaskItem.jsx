import { useNavigate } from 'react-router-dom';
import { formatDeadline } from '../utils/dateFormatter';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskItem = ({ task, onDelete }) => {
  const { addTagToTask, removeTagFromTask } = useTasks();
  const { colors } = useTheme();
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const navigate = useNavigate();

  const handleView = (e) => {
    e.preventDefault();
    navigate(`/tasks/view/${task.id}`, '_blank');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/tasks/edit/${task.id}`);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      addTagToTask(task.id, newTag.trim());
      setNewTag('');
      setShowTagInput(false);
    }
  };

  return (
    <div 
      className="task-item" 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
      style={{
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        backgroundColor: colors.cardBg,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
        color: colors.text
      }}
    >
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button 
          onClick={() => setShowTagInput(!showTagInput)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            color: colors.text
          }}
          title="Adicionar tag"
        >
          <span style={{ fontSize: '18px' }}>🏷️</span>
        </button>

        {showTagInput && (
          <div style={{
            position: 'absolute',
            right: '0',
            top: '30px',
            backgroundColor: colors.cardBg,
            color: colors.text,
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 100,
            width: '200px'
          }}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nome da tag"
              style={{
                padding: '5px',
                marginBottom: '5px',
                width: '100%',
                borderRadius: '3px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.background,
                color: colors.text
              }}
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                onClick={handleAddTag}
                style={{
                  padding: '5px 10px',
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Adicionar
              </button>
              <button 
                onClick={() => setShowTagInput(false)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{task.name}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{            //tipo
            padding: '3px 8px',
            backgroundColor: '#e0f7fa',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'black' 
          }}>
            {task.type || 'Sem tipo'}
          </span>
          <span style={{   //prioridade
            padding: '3px 8px',
            backgroundColor: '#fff8e1',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'black' 
          }}>
            {task.priority || 'Sem prioridade'}
          </span>
          <span style={{
            padding: '3px 8px',          //status
            backgroundColor: task.status === 'concluida' ? '#e8f5e9' : 
                            task.status === 'progresso' ? '#e3f2fd' : '#ffebee',
            borderRadius: '4px',
            fontSize: '12px',
            color: 'black' 
          }}>
            {task.status || 'pendente'}
          </span>
        </div>
      </div>

      <div style={{ margin: '10px 0', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {(task.tags || []).map((tag, index) => (
          <span 
            key={index}
            style={{
              backgroundColor: '#e0e0e0',
              padding: '3px 8px',
              borderRadius: '8px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'black' 
            }}
          >
            {tag}
            <button 
              onClick={() => removeTagFromTask(task.id, tag)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: '0',
                fontSize: '14px'
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div style={{ margin: '10px 0' }}>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Prazo:</strong> {formatDeadline(task.deadline) || 'Não definido'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button 
          onClick={handleView}
          style={{
            padding: '6px 12px',
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Visualizar
        </button>
        <button 
          onClick={handleEdit}
          style={{
            padding: '6px 12px',
            backgroundColor: colors.secondary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
