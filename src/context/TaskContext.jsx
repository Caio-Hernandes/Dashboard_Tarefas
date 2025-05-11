import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Importação do UUID
import { formatDeadline } from '../utils/dateFormatter'; // Corrigindo o caminho da importação
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  // Estados
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskToEdit, setTaskToEdit] = useState(null);
  const { user } = useAuth();

  // useEffect para carregar tarefas salvas
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // useEffect para salvar tarefas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect para salvar o usuário
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Função para adicionar uma tarefa
  const addTask = (task) => {
    if (!user) {
      console.error("Usuário não logado. Não é possível adicionar tarefas.");
      return;
    }
  
    const newTask = {
  ...task,
  id: uuidv4(),
  description: task.description || "", // ← garante que sempre exista
  date: new Date().toISOString(),
  status: task.status || 'pendente',
  userId: user.id,
};

  
    setTasks(prev => [...prev, newTask]);
  };

  // Função para editar uma tarefa
  const updateTask = (id, updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task // Mantém todas propriedades existentes
    ));
    setTaskToEdit(null);
  };

  // Função para remover uma tarefa
  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Função para limpar a edição manualmente
  const clearTaskToEdit = () => {
    setTaskToEdit(null);
  };

  // Função para atualizar o status de uma tarefa
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  const addTagToTask = (taskId, tag) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, tags: [...(task.tags || []), tag.toLowerCase()] } 
        : task
    ));
  };
  const removeTagFromTask = (taskId, tagToRemove) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, tags: (task.tags || []).filter(tag => tag !== tagToRemove) } 
        : task
    ));
  };


  // Função para registrar um novo usuário
  const registerUser = (username, password) => {
    const newUser = {
      id: uuidv4(),
      username,
      password, // Em produção, a senha deve ser criptografada
    };

    setUser(newUser); // Salva o usuário no estado
  };

  // Função para logar um usuário
  const loginUser = (username, password) => {
    if (user && user.username === username && user.password === password) {
      return true;
    }
    return false;
  };
  const updateTaskDescription = (taskId, newDescription) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, description: newDescription } : task
    ));
  };

  // Filtra as tarefas para mostrar apenas as do usuário logado
  const userTasks = tasks.filter(task => task.userId === user?.id);

  const getUniqueTags = () => {
    return [...new Set(tasks.flatMap(task => task.tags || []))];
  };
  
  const getUniqueTypes = () => {
    return [...new Set(tasks.map(task => task.type))];
  };
  
  const getUniquePriorities = () => {
    return [...new Set(tasks.map(task => task.priority))];
  };

  return (
    <TaskContext.Provider value={{
      tasks: userTasks, 
      taskToEdit,
      addTask,
      updateTask,
      removeTask,
      setTaskToEdit,
      clearTaskToEdit,
      registerUser,
      loginUser,
      updateTaskDescription,
      updateTaskStatus, 
      formatDeadline,
      addTagToTask,
      removeTagFromTask, 
      getUniqueTags,
      getUniqueTypes,
      getUniquePriorities
    }}>
      {children}
    </TaskContext.Provider>
  );
};
