import React, { useState } from 'react';
import { Check, Edit3, Trash2, Flag, X, Save } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, editTitle, editDescription, editPriority);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const priorityConfig = {
    low: { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    medium: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    high: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (isEditing) {
    return (
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Title"
            maxLength={200}
            autoFocus
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Description (optional)"
            rows={3}
          />

          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setEditPriority(p)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  editPriority === p
                    ? `${priorityConfig[p].color} ${priorityConfig[p].bg}`
                    : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const priority = priorityConfig[task.priority] || {
    color: 'text-gray-500',
    bg: 'bg-gray-100 dark:bg-gray-700'
  };

  return (
    <div className={`p-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 group ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400'
          }`}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className={`text-lg font-medium transition-all duration-200 ${
                task.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{task.description}</p>
              )}

              {/* Task Status */}
              <div className="mt-2">
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${
                  task.completed
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {task.completed ? '✅ Completed' : '⏳ Pending'}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${priority.color} ${priority.bg}`}>
                  <Flag className="w-3 h-3" />
                  {task.priority} priority
                </span>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Created {formatDate(task.createdAt)}
                </span>

                {task.updatedAt !== task.createdAt && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    • Updated {formatDate(task.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
