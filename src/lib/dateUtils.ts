import { Weekday, WeekdayInfo } from '@/types';

// Complete 7-day week configuration with black and blue theme
export const WEEKDAYS: WeekdayInfo[] = [
  {
    key: 'monday',
    label: 'Monday',
    shortLabel: 'Mon',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-gray-800 via-gray-700 to-blue-800',
    textColor: 'text-blue-100'
  },
  {
    key: 'tuesday',
    label: 'Tuesday',
    shortLabel: 'Tue',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-blue-900 via-blue-800 to-gray-800',
    textColor: 'text-blue-100'
  },
  {
    key: 'wednesday',
    label: 'Wednesday',
    shortLabel: 'Wed',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800',
    textColor: 'text-blue-100'
  },
  {
    key: 'thursday',
    label: 'Thursday',
    shortLabel: 'Thu',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-blue-800 via-blue-700 to-gray-700',
    textColor: 'text-blue-100'
  },
  {
    key: 'friday',
    label: 'Friday',
    shortLabel: 'Fri',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-gray-700 via-blue-800 to-blue-900',
    textColor: 'text-blue-100'
  },
  {
    key: 'saturday',
    label: 'Saturday',
    shortLabel: 'Sat',
    isWeekend: true,
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-black',
    textColor: 'text-blue-100'
  },
  {
    key: 'sunday',
    label: 'Sunday',
    shortLabel: 'Sun',
    isWeekend: true,
    gradient: 'bg-gradient-to-br from-black via-gray-800 to-blue-700',
    textColor: 'text-blue-100'
  }
];

// Get current weekday
export const getCurrentWeekday = (): Weekday => {
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const weekdayMap: Record<number, Weekday> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };
  
  return weekdayMap[dayIndex];
};

// Get weekday info by key
export const getWeekdayInfo = (weekday: Weekday): WeekdayInfo => {
  const info = WEEKDAYS.find(w => w.key === weekday);
  if (!info) {
    throw new Error(`Invalid weekday: ${weekday}`);
  }
  return info;
};

// Check if a weekday is weekend
export const isWeekend = (weekday: Weekday): boolean => {
  return weekday === 'saturday' || weekday === 'sunday';
};

// Get weekdays by type
export const getWeekdays = (weekendOnly?: boolean): WeekdayInfo[] => {
  if (weekendOnly === undefined) return WEEKDAYS;
  return WEEKDAYS.filter(day => day.isWeekend === weekendOnly);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Get next weekday
export const getNextWeekday = (current: Weekday): Weekday => {
  const currentIndex = WEEKDAYS.findIndex(w => w.key === current);
  const nextIndex = (currentIndex + 1) % WEEKDAYS.length;
  return WEEKDAYS[nextIndex].key;
};

// Get previous weekday
export const getPreviousWeekday = (current: Weekday): Weekday => {
  const currentIndex = WEEKDAYS.findIndex(w => w.key === current);
  const prevIndex = currentIndex === 0 ? WEEKDAYS.length - 1 : currentIndex - 1;
  return WEEKDAYS[prevIndex].key;
};