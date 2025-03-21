export interface Task {
  name?: string;
  duration: number;
  lateDate: number;
  earlyDate: number;
  nextTasks: string[];
  prevTasks: string[];
}
