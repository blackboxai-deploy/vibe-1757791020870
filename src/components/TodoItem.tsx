'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import { getCategoryInfo } from '@/lib/weekendUtils';

interface TodoItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  index: number;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  index
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const categoryInfo = getCategoryInfo(task.category);

  // Handle edit save
  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      });
      setIsEditing(false);
    }
  };

  // Handle edit cancel
  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-300 bg-red-900/30';
      case 'medium': return 'text-yellow-300 bg-yellow-900/30';
      case 'low': return 'text-blue-300 bg-blue-900/30';
      default: return 'text-gray-300 bg-gray-700/30';
    }
  };

  // Priority icons
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div 
      className={`
        p-4 transition-all duration-200 hover:bg-gray-800/50
        ${task.completed ? 'opacity-75' : ''}
      `}
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      <div className="flex items-start space-x-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1
            ${task.completed 
              ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 text-white shadow-md' 
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
            }
          `}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Task title..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
                autoFocus
              />
              
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="Description (optional)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleSaveEdit();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
              />
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Display Mode */
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 
                    className={`
                      text-sm font-medium transition-all duration-200
                      ${task.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-200 hover:text-blue-300'
                      }
                    `}
                  >
                    {task.title}
                  </h4>
                  
                  {task.description && (
                    <p 
                      className={`
                        mt-1 text-xs transition-all duration-200
                        ${task.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-400'
                        }
                      `}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1 ml-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded transition-all duration-200"
                    title="Edit task"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-all duration-200"
                    title="Delete task"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Task Metadata */}
              <div className="flex items-center space-x-3 mt-3">
                {/* Category Badge */}
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color} text-white`}>
                  <span>{categoryInfo.icon}</span>
                  <span>{categoryInfo.label}</span>
                </div>

                {/* Priority Badge */}
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  <span>{getPriorityIcon(task.priority)}</span>
                  <span className="capitalize">{task.priority}</span>
                </div>

                {/* Weekend Badge */}
                {task.isWeekend && (
                  <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-800 text-blue-200">
                    <span>🌙</span>
                    <span>Weekend</span>
                  </div>
                )}

                {/* Due Date */}
                {task.dueDate && (
                  <div className="text-xs text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};