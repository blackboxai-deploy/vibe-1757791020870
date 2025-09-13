'use client';

import React from 'react';
import { TaskCategory, Task, Weekday } from '@/types';
import { getSuggestedCategories } from '@/lib/weekendUtils';

interface CategoryFilterProps {
  selectedCategory?: TaskCategory;
  onCategoryChange: (category?: TaskCategory) => void;
  selectedWeekday: Weekday;
  tasks: Task[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedWeekday,
  tasks
}) => {
  // Get task counts for each category
  const getCategoryTaskCount = (category: TaskCategory) => {
    const categoryTasks = tasks.filter(task => 
      task.category === category && task.weekday === selectedWeekday
    );
    const completed = categoryTasks.filter(task => task.completed).length;
    return { total: categoryTasks.length, completed };
  };

  // Get all task count for selected weekday
  const getAllTaskCount = () => {
    const weekdayTasks = tasks.filter(task => task.weekday === selectedWeekday);
    const completed = weekdayTasks.filter(task => task.completed).length;
    return { total: weekdayTasks.length, completed };
  };

  const suggestedCategories = getSuggestedCategories(selectedWeekday);
  const allTaskCount = getAllTaskCount();

  return (
    <div className="bg-black/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-500/20 p-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
        <span className="mr-2">🏷️</span>
        Filter by Category
      </h3>

      <div className="space-y-2">
        {/* All Tasks Option */}
        <button
          onClick={() => onCategoryChange(undefined)}
          className={`
            w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between
            ${!selectedCategory 
              ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-md border border-blue-400/30' 
              : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:shadow-md border border-gray-600/30'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">📋</span>
            <span className="font-medium">All Tasks</span>
          </div>
          <div className={`
            px-2 py-1 rounded-full text-xs font-bold
            ${!selectedCategory 
              ? 'bg-blue-400/20 text-blue-100' 
              : 'bg-gray-600 text-gray-300'
            }
          `}>
            {allTaskCount.completed}/{allTaskCount.total}
          </div>
        </button>

        {/* Category Options */}
        {suggestedCategories.map((category) => {
          const taskCount = getCategoryTaskCount(category.key);
          const isSelected = selectedCategory === category.key;
          const hasNoTasks = taskCount.total === 0;

          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              disabled={hasNoTasks}
              className={`
                w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between
                ${isSelected 
                  ? `${category.color} text-white shadow-md border border-blue-400/30` 
                  : hasNoTasks
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
                    : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:shadow-md border border-gray-600/30'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-lg ${hasNoTasks ? 'grayscale' : ''}`}>
                  {category.icon}
                </span>
                <div>
                  <span className="font-medium">{category.label}</span>
                  {category.isWeekendCategory && (
                    <div className="text-xs opacity-75 mt-1">
                      Weekend Category
                    </div>
                  )}
                </div>
              </div>
              
              {taskCount.total > 0 && (
                <div className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-600 text-gray-300'
                  }
                `}>
                  {taskCount.completed}/{taskCount.total}
                </div>
              )}
            </button>
          );
        })}

        {/* Weekend/Weekday Categories Toggle Info */}
        <div className="mt-6 p-3 bg-gradient-to-r from-gray-800 via-gray-700 to-blue-800 rounded-xl border border-blue-500/20">
          <div className="text-sm text-gray-300">
            <div className="font-medium mb-2">
              {selectedWeekday === 'saturday' || selectedWeekday === 'sunday' 
                ? '🌙 Weekend Categories' 
                : '📅 Weekday Focus'
              }
            </div>
            <p className="text-xs">
              {selectedWeekday === 'saturday' || selectedWeekday === 'sunday'
                ? 'Weekend categories are prioritized for a balanced lifestyle!'
                : 'Productivity categories help you stay focused during the week.'
              }
            </p>
          </div>
        </div>

        {/* Category Stats Summary */}
        {allTaskCount.total > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {selectedWeekday.charAt(0).toUpperCase() + selectedWeekday.slice(1)} Overview
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-900/30 text-blue-300 p-2 rounded-lg text-center border border-blue-700/30">
                <div className="font-bold">{allTaskCount.completed}</div>
                <div>Completed</div>
              </div>
              <div className="bg-gray-800/50 text-gray-300 p-2 rounded-lg text-center border border-gray-600/30">
                <div className="font-bold">{allTaskCount.total - allTaskCount.completed}</div>
                <div>Remaining</div>
              </div>
            </div>
            
            {/* Completion Percentage */}
            <div className="bg-gray-700/50 rounded-lg p-2 border border-gray-600/30">
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>Progress</span>
                <span>{Math.round((allTaskCount.completed / allTaskCount.total) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500"
                  style={{ 
                    width: `${(allTaskCount.completed / allTaskCount.total) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};