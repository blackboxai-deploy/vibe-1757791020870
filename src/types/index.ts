// Type definitions for the 7-day week app with to-do list

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type TaskCategory = 
  | 'work' 
  | 'personal' 
  | 'health' 
  | 'shopping' 
  | 'weekend-fun' 
  | 'family' 
  | 'hobbies' 
  | 'other';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TaskCategory;
  weekday: Weekday;
  priority: TaskPriority;
  isWeekend: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export interface WeekdayInfo {
  key: Weekday;
  label: string;
  shortLabel: string;
  isWeekend: boolean;
  gradient: string;
  textColor: string;
}

export interface CategoryInfo {
  key: TaskCategory;
  label: string;
  color: string;
  icon: string;
  isWeekendCategory: boolean;
}

export interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  weekdayStats: Record<Weekday, { total: number; completed: number }>;
  categoryStats: Record<TaskCategory, { total: number; completed: number }>;
}

export interface FilterOptions {
  category?: TaskCategory;
  completed?: boolean;
  priority?: TaskPriority;
  searchTerm?: string;
  weekday?: Weekday;
  showWeekendOnly?: boolean;
}