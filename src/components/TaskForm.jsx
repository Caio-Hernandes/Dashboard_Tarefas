import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const TaskForm = ({ onSuccess }) => {
  const { addTask, updateTask, taskToEdit } = useTasks();
  const { colors } = useTheme();
  const [task, setTask] = useState({
    name: "",
    type: "",
    deadline: "",
    priority: "",
    status: "pendente",
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      addNewTag();
    }
  };

  const addNewTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !task.tags.includes(newTag)) {
      setTask(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        name: taskToEdit.name,
        type: taskToEdit.type,
        deadline: taskToEdit.deadline?.replace(/:(\d{2})$/, '') || '',
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        tags: taskToEdit.tags || []
      });
    } else {
      setTask({
        name: "",
        type: "",
        deadline: "",
        priority: "",
        status: "pendente",
        tags: []
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTask = {
      ...task,
      deadline: task.deadline ? `${task.deadline}:00` : ''
    };
    taskToEdit ? updateTask(taskToEdit.id, formattedTask) : addTask(formattedTask);
    onSuccess?.();
  };

 const inputStyle = {
  background: colors.cardBg,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  padding: '8px',
  borderRadius: '4px',
  width: '100%',
  marginBottom: '10px',
  boxSizing: 'border-box'
  
};
  const labelStyle = {
    color: colors.text,
    marginBottom: '4px',
    display: 'block'
  };

  const buttonStyle = {
    backgroundColor: colors.primary,
    color: colors.text,
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: colors.background, padding: '20px', borderRadius: '8px', maxWidth: '1360px', margin: '0 auto' }}>
      <div>
        <label style={labelStyle}>Nome da Tarefa:</label>
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Tags:</label>
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          onBlur={addNewTag}
          placeholder="Digite e pressione vírgula ou Enter"
          style={inputStyle}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
          {task.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: colors.secondary,
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#fff'
              }}
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <br/>

      <div>
        <label style={labelStyle}>Tipo:</label>
        <select
          value={task.type}
          onChange={(e) => setTask({ ...task, type: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="">Selecione...</option>
          <option value="trabalho">Trabalho</option>
          <option value="pessoal">Pessoal</option>
          <option value="estudo">Estudo</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Prazo:</label>
        <input
          type="datetime-local"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Prioridade:</label>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="">Selecione...</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
      </div>

      <button type="submit" style={buttonStyle}>
        {taskToEdit ? 'Atualizar Tarefa' : 'Criar Tarefa'}
      </button>
    </form>
  );
};

export default TaskForm;
