'use client';

import React, { useState, useEffect } from 'react';
import { Task, Weekday, FilterOptions } from '@/types';
import { getCurrentWeekday } from '@/lib/dateUtils';
import { loadTasks, saveTasks } from '@/lib/storage';
import { WeekdayNavigation } from './WeekdayNavigation';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import { CategoryFilter } from './CategoryFilter';
import { ProgressStats } from './ProgressStats';
import { WeekendModeToggle } from './WeekendModeToggle';

export const WeekdayApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>(getCurrentWeekday());
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isWeekendMode, setIsWeekendMode] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Generate unique ID for new tasks
  const generateTaskId = (): string => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new task
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'isWeekend'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateTaskId(),
      createdAt: new Date(),
      isWeekend: taskData.weekday === 'saturday' || taskData.weekday === 'sunday'
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsAddingTask(false);
  };

  // Update existing task
  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates }
          : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const handleToggleComplete = (taskId: string) => {
    handleUpdateTask(taskId, { 
      completed: !tasks.find(t => t.id === taskId)?.completed 
    });
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filters and selected weekday
  const filteredTasks = tasks.filter(task => {
    // Weekday filter
    if (selectedWeekday && task.weekday !== selectedWeekday) return false;
    
    // Category filter
    if (filters.category && task.category !== filters.category) return false;
    
    // Completion filter
    if (filters.completed !== undefined && task.completed !== filters.completed) return false;
    
    // Priority filter
    if (filters.priority && task.priority !== filters.priority) return false;
    
    // Weekend mode filter
    if (isWeekendMode && !task.isWeekend) return false;
    
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descMatch = task.description?.toLowerCase().includes(searchLower);
      if (!titleMatch && !descMatch) return false;
    }
    
    return true;
  });

  // Get tasks for selected weekday
  const weekdayTasks = tasks.filter(task => task.weekday === selectedWeekday);
  const completedWeekdayTasks = weekdayTasks.filter(task => task.completed);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-gray-700 to-blue-800 animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading your weekly planner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Weekend Mode Toggle */}
      <WeekendModeToggle 
        isWeekendMode={isWeekendMode}
        onToggle={setIsWeekendMode}
      />

      {/* Week Navigation */}
      <WeekdayNavigation
        selectedWeekday={selectedWeekday}
        onSelectWeekday={setSelectedWeekday}
        tasks={tasks}
        isWeekendMode={isWeekendMode}
      />

      {/* Progress Stats */}
      <ProgressStats 
        tasks={tasks}
        selectedWeekday={selectedWeekday}
        isWeekendMode={isWeekendMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Todo List Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Task Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-200">
              Tasks for {selectedWeekday.charAt(0).toUpperCase() + selectedWeekday.slice(1)}
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({completedWeekdayTasks.length}/{weekdayTasks.length} completed)
              </span>
            </h2>
            
            <button
              onClick={() => setIsAddingTask(true)}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-medium hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500/30"
            >
              <span className="mr-2">✨</span>
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <AddTodoForm
              selectedWeekday={selectedWeekday}
              onSubmit={handleAddTask}
              onCancel={() => setIsAddingTask(false)}
            />
          )}

          {/* Todo List */}
          <TodoList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            selectedWeekday={selectedWeekday}
          />

          {/* Clear Completed Tasks */}
          {tasks.some(task => task.completed) && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleClearCompleted}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                Clear Completed Tasks
              </button>
            </div>
          )}
        </div>

        {/* Sidebar with Filters */}
        <div className="space-y-6">
          <CategoryFilter
            selectedCategory={filters.category}
            onCategoryChange={(category) => 
              setFilters(prev => ({ ...prev, category }))
            }
            selectedWeekday={selectedWeekday}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};