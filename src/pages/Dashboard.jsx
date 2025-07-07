import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { FilterTabs } from '../components/FilterTabs';
import { TaskStats } from '../components/TaskStats';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { loadTasks, saveTasks } from '../utils/storage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false); // ✅ prevent premature save

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/');
      return;
    }

    setUsername(storedUsername);

    const savedTasks = loadTasks();
    setTasks(savedTasks);

    const savedTheme = localStorage.getItem('darkMode');
    setDarkMode(savedTheme === 'true');

    setHasLoaded(true); // ✅ now allow saving
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, hasLoaded]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const addTask = (title, description, priority) => {
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, title, description, priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
              priority,
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // ✅ Priority-based sort
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filteredTasks = tasks
    .filter((task) => {
      switch (filter) {
        case 'active':
          return !task.completed;
        case 'completed':
          return task.completed;
        default:
          return true;
      }
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'dark bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onLogout={handleLogout}
        />

        <div className="space-y-8">
          <TaskForm onAddTask={addTask} />
          <TaskStats tasks={tasks} />

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <FilterTabs
              filter={filter}
              onFilterChange={setFilter}
              tasksCount={taskCounts}
            />
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              filter={filter}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
