import type { Task } from '@/interface/Task';

export const handleOrderTasks = (tasks: Map<string, Task>, orderTasks: string[]) => {
  const inDegree = new Map();
  const graph: Map<string, string[]> = new Map();

  tasks.forEach((task, key) => {
    inDegree.set(key, 0);
    graph.set(key, []);
  });

  tasks.forEach((task, key) => {
    task.prevTasks.forEach((prevTask) => {
      const _task = tasks.get(prevTask);
      if (_task) {
        if (!_task.nextTasks.includes(key)) _task.nextTasks.push(key);
        graph.get(prevTask)?.push(key);
        inDegree.set(key, inDegree.get(key) + 1);
      }
    });
  });

  const queue: string[] = [];
  inDegree.forEach((deg, task) => {
    if (deg === 0) queue.push(task);
  });

  while (queue.length > 0) {
    const current: string = queue.shift() as string;
    orderTasks.push(current);

    graph.get(current)?.forEach((nextTask) => {
      inDegree.set(nextTask, inDegree.get(nextTask) - 1);
      if (inDegree.get(nextTask) === 0) queue.push(nextTask);
    });
  }
};
