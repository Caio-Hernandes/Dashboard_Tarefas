import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskFilter = ({ onFilter }) => {
  const { tasks } = useTasks();
  const { colors } = useTheme();
  const [filters, setFilters] = useState({
    tags: [],
    type: '',
    priority: ''
  });

  const allTags = [...new Set(tasks.flatMap(task => task.tags || []))];
  const allTypes = [...new Set(tasks.map(task => task.type))];
  const allPriorities = [...new Set(tasks.map(task => task.priority))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const applyFilters = () => onFilter(filters);
  const resetFilters = () => {
    const initial = { tags: [], type: '', priority: '' };
    setFilters(initial);
    onFilter(initial);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: colors.cardBackground,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3>Filtrar Tarefas</h3>

      <div style={{ marginBottom: '15px' }}>
        <h4>Tags:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              style={{
                padding: '6px 10px',
                borderRadius: '4px',
                border: filters.tags.includes(tag)
                  ? `2px solid ${colors.primary}`
                  : `1px solid ${colors.border}`,
                backgroundColor: filters.tags.includes(tag)
                  ? colors.background
                  : colors.cardBackground,
                color: colors.text,
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Tipo:</h4>
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          style={{
            width: '100%',
            backgroundColor: colors.inputBackground,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            padding: '8px'
          }}
        >
          <option value="">Todos</option>
          {allTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Prioridade:</h4>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          style={{
            width: '100%',
            backgroundColor: colors.inputBackground,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            padding: '8px'
          }}
        >
          <option value="">Todas</option>
          {allPriorities.map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
      }}>
        <button
          onClick={applyFilters}
          style={{
            padding: '8px 12px',
            backgroundColor: colors.primary,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Aplicar filtros
        </button>
        <button
          onClick={resetFilters}
          style={{
            padding: '8px 12px',
            backgroundColor: colors.danger,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
