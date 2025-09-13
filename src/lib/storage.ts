import { Task } from '@/types';

const STORAGE_KEY = 'weekday-app-tasks';

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  try {
    const serialized = JSON.stringify(tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      dueDate: task.dueDate?.toISOString()
    })));
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

// Load tasks from localStorage
export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

// Clear all tasks
export const clearTasks = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tasks:', error);
  }
};

// Export tasks as JSON
export const exportTasks = (tasks: Task[]): string => {
  return JSON.stringify(tasks, null, 2);
};

// Import tasks from JSON
export const importTasks = (jsonString: string): Task[] => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid format: expected array');
    }
    
    return parsed.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  } catch (error) {
    console.error('Failed to import tasks:', error);
    throw error;
  }
};