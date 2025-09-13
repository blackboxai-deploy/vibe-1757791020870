import { TaskCategory, CategoryInfo, Task, Weekday } from '@/types';

// Category configuration with black and blue theme
export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'work',
    label: 'Work',
    color: 'bg-blue-600',
    icon: '💼',
    isWeekendCategory: false
  },
  {
    key: 'personal',
    label: 'Personal',
    color: 'bg-blue-500',
    icon: '👤',
    isWeekendCategory: false
  },
  {
    key: 'health',
    label: 'Health',
    color: 'bg-blue-700',
    icon: '❤️',
    isWeekendCategory: false
  },
  {
    key: 'shopping',
    label: 'Shopping',
    color: 'bg-gray-600',
    icon: '🛒',
    isWeekendCategory: false
  },
  {
    key: 'weekend-fun',
    label: 'Weekend Fun',
    color: 'bg-blue-800',
    icon: '🎉',
    isWeekendCategory: true
  },
  {
    key: 'family',
    label: 'Family Time',
    color: 'bg-gray-700',
    icon: '👨‍👩‍👧‍👦',
    isWeekendCategory: true
  },
  {
    key: 'hobbies',
    label: 'Hobbies',
    color: 'bg-blue-900',
    icon: '🎨',
    isWeekendCategory: true
  },
  {
    key: 'other',
    label: 'Other',
    color: 'bg-gray-500',
    icon: '📝',
    isWeekendCategory: false
  }
];

// Get category info by key
export const getCategoryInfo = (category: TaskCategory): CategoryInfo => {
  const info = CATEGORIES.find(c => c.key === category);
  if (!info) {
    throw new Error(`Invalid category: ${category}`);
  }
  return info;
};

// Get categories by type (weekend/weekday)
export const getCategories = (weekendOnly?: boolean): CategoryInfo[] => {
  if (weekendOnly === undefined) return CATEGORIES;
  return CATEGORIES.filter(cat => cat.isWeekendCategory === weekendOnly);
};

// Get suggested categories for a weekday
export const getSuggestedCategories = (weekday: Weekday): CategoryInfo[] => {
  const isWeekendDay = weekday === 'saturday' || weekday === 'sunday';
  
  if (isWeekendDay) {
    // For weekends, show weekend categories first, then general ones
    return [
      ...getCategories(true), // Weekend-specific categories
      ...getCategories(false).filter(cat => 
        ['personal', 'health', 'shopping', 'other'].includes(cat.key)
      )
    ];
  } else {
    // For weekdays, show work categories first
    return [
      ...getCategories(false).filter(cat => 
        ['work', 'personal', 'health'].includes(cat.key)
      ),
      ...getCategories(false).filter(cat => 
        !['work', 'personal', 'health'].includes(cat.key)
      )
    ];
  }
};

// Filter tasks by weekend/weekday
export const filterTasksByWeekendMode = (tasks: Task[], showWeekendOnly: boolean): Task[] => {
  return tasks.filter(task => task.isWeekend === showWeekendOnly);
};

// Get weekend motivation messages
export const getWeekendMotivation = (completedTasks: number): string => {
  const messages = [
    "🌟 Great start to your weekend!",
    "🎯 You're crushing your weekend goals!",
    "🚀 Weekend productivity mode activated!",
    "✨ Making the most of your weekend!",
    "🎉 Weekend warrior in action!",
    "🌈 Your weekend is looking bright!",
    "⭐ Weekend goals are within reach!",
    "🎨 Creating an amazing weekend!",
    "🌞 Sunshine and productivity!",
    "🎊 Weekend success is yours!"
  ];
  
  return messages[completedTasks % messages.length];
};

// Get weekday motivation messages
export const getWeekdayMotivation = (completedTasks: number): string => {
  const messages = [
    "💪 Crushing your weekday goals!",
    "🎯 Focus mode activated!",
    "🚀 Productivity is your superpower!",
    "⚡ Powered up and ready!",
    "🔥 On fire with productivity!",
    "⭐ Star performer today!",
    "🎪 Making magic happen!",
    "🌟 Shining bright today!",
    "💎 Gem of productivity!",
    "🎨 Crafting a successful day!"
  ];
  
  return messages[completedTasks % messages.length];
};