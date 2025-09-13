'use client';

import React from 'react';

interface WeekendModeToggleProps {
  isWeekendMode: boolean;
  onToggle: (isWeekendMode: boolean) => void;
}

export const WeekendModeToggle: React.FC<WeekendModeToggleProps> = ({
  isWeekendMode,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-500/20 p-4">
        <div className="flex items-center space-x-6">
          {/* Weekday Mode */}
          <button
            onClick={() => onToggle(false)}
            className={`
              flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform border
              ${!isWeekendMode 
                ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg scale-105 border-blue-400/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-102 border-gray-600/30'
              }
            `}
          >
            <div className="text-2xl">📅</div>
            <div className="text-left">
              <div className="font-semibold text-sm">Full Week</div>
              <div className="text-xs opacity-90">Monday - Sunday</div>
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-12 bg-gray-600" />

          {/* Weekend Mode */}
          <button
            onClick={() => onToggle(true)}
            className={`
              flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform border
              ${isWeekendMode 
                ? 'bg-gradient-to-r from-blue-700 via-gray-700 to-blue-900 text-white shadow-lg scale-105 border-blue-400/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-102 border-gray-600/30'
              }
            `}
          >
            <div className="text-2xl">🌙</div>
            <div className="text-left">
              <div className="font-semibold text-sm">Weekend Mode</div>
              <div className="text-xs opacity-90">Saturday & Sunday</div>
            </div>
          </button>
        </div>

        {/* Mode Description */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            {isWeekendMode 
              ? '🌙 Focus on weekend activities and family time' 
              : '🎯 View your complete weekly schedule and tasks'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Weekdays</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span>Weekends</span>
          </div>
        </div>
      </div>
    </div>
  );
};