// src/components/TaskDescriptionEditor.jsx
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskDescriptionEditor = ({ taskId, initialDescription }) => {
  const { colors } = useTheme();
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTaskDescription } = useTasks();

  const handleSave = () => {
    updateTaskDescription(taskId, description);
    setIsEditing(false);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h3
        style={{
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: '10px',
          color: colors.text
        }}
      >
        Descrição
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            marginLeft: '10px',
            padding: '3px 8px',
            fontSize: '12px',
            backgroundColor: isEditing ? colors.cardBg : colors.primary,
            color: isEditing ? colors.text : '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          {isEditing ? 'Cancelar' : description ? 'Editar' : 'Adicionar'}
        </button>
      </h3>

      {isEditing ? (
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '10px',
              border: `1px solid ${colors.border}`,
              borderRadius: '4px',
              fontFamily: 'inherit',
              fontSize: '14px',
              marginBottom: '10px',
              resize: 'vertical',
              overflowY: 'auto',
              backgroundColor: colors.cardBg,
              color: colors.text,
              boxSizing: 'border-box'
            }}
            placeholder="Digite a descrição detalhada da tarefa..."
          />
          <button
            onClick={handleSave}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: colors.primary,
              color: '#fff',
              border: `1px solid ${colors.border}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Salvar Descrição
          </button>
        </div>
      ) : (
        <div
          style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: colors.cardBg,
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            minHeight: '50px',
            boxSizing: 'border-box',
            border: `1px solid ${colors.border}`,
            color: colors.text
          }}
        >
          {description || (
            <em style={{ color: colors.secondary }}>
              Clique em "Adicionar Descrição" para criar uma
            </em>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescriptionEditor;
