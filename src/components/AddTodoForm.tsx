'use client';

import React, { useState } from 'react';
import { Task, Weekday, TaskCategory, TaskPriority } from '@/types';
import { getSuggestedCategories } from '@/lib/weekendUtils';
import { WEEKDAYS } from '@/lib/dateUtils';

interface AddTodoFormProps {
  selectedWeekday: Weekday;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'isWeekend'>) => void;
  onCancel: () => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  selectedWeekday,
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [weekday, setWeekday] = useState<Weekday>(selectedWeekday);
  const [dueDate, setDueDate] = useState('');

  const suggestedCategories = getSuggestedCategories(weekday);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const taskData: Omit<Task, 'id' | 'createdAt' | 'isWeekend'> = {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      weekday,
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    onSubmit(taskData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('personal');
    setPriority('medium');
    setDueDate('');
  };

  // Quick task templates
  const getQuickTasks = () => {
    const isWeekend = weekday === 'saturday' || weekday === 'sunday';
    
    if (isWeekend) {
      return [
        { title: 'Plan weekend activities', category: 'weekend-fun' as TaskCategory },
        { title: 'Spend time with family', category: 'family' as TaskCategory },
        { title: 'Work on hobby project', category: 'hobbies' as TaskCategory },
        { title: 'Relax and recharge', category: 'personal' as TaskCategory }
      ];
    } else {
      return [
        { title: 'Check emails', category: 'work' as TaskCategory },
        { title: 'Complete daily workout', category: 'health' as TaskCategory },
        { title: 'Plan tomorrow\'s tasks', category: 'personal' as TaskCategory },
        { title: 'Weekly grocery shopping', category: 'shopping' as TaskCategory }
      ];
    }
  };

  const quickTasks = getQuickTasks();

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-500/30 p-6 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-200 flex items-center">
          <span className="mr-2">✨</span>
          Add New Task
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="What needs to be done?"
            required
            autoFocus
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Add more details..."
            rows={3}
          />
        </div>

        {/* Category and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {suggestedCategories.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low">🔵 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
        </div>

        {/* Weekday and Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weekday Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Assign to Day
            </label>
            <select
              value={weekday}
              onChange={(e) => setWeekday(e.target.value as Weekday)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {WEEKDAYS.map((day) => (
                <option key={day.key} value={day.key}>
                  {day.isWeekend ? (day.key === 'saturday' ? '🌙' : '🌙') : '📅'} {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Quick Task Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Tasks {weekday === 'saturday' || weekday === 'sunday' ? '(Weekend)' : '(Weekday)'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {quickTasks.map((quickTask, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setTitle(quickTask.title);
                  setCategory(quickTask.category);
                }}
                className="p-3 text-left text-sm bg-gradient-to-r from-gray-700 via-gray-600 to-blue-800 hover:from-gray-600 hover:via-gray-500 hover:to-blue-700 border border-blue-500/30 rounded-xl transition-all duration-200 hover:shadow-md text-gray-200"
              >
                {quickTask.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all duration-200"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={!title.trim()}
            className={`
              px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
              ${title.trim() 
                ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 border border-blue-500/30' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="mr-2">✅</span>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};