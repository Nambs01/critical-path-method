export interface Task {
  duration: number;
  lateDate: number;
  earlyDate: number;
  nextTasks: string[];
  prevTasks: string[];
}
