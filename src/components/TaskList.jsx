import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { CheckCircle2, ListTodo, Trash2 } from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const TaskList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  filter,
  onClearCompleted
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const hasCompletedTasks = tasks.some(task => task.completed);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setDeleteModalOpen(false);
  };

  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          {filter === 'completed' ? (
            <CheckCircle2 className="w-12 h-12 text-gray-400" />
          ) : (
            <ListTodo className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {filter === 'completed' ? 'No completed tasks yet' : 
           filter === 'active' ? 'No active tasks' : 'No tasks yet'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {filter === 'completed' ? 'Complete some tasks to see them here.' : 
           filter === 'active' ? 'All your tasks are completed! Great job!' : 'Create your first task to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={() => handleDeleteClick(task)}
            onEdit={onEditTask}
          />
        ))}
      </div>

      {filter === 'completed' && hasCompletedTasks && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button
            onClick={onClearCompleted}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Completed Tasks
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        taskTitle={taskToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
