import type { Task } from '@/interface/Task';

export const handleOrderTasks = (
  tasks: Map<string, Task>,
): Promise<{ orderedTasks: string[]; tasksDegree: string[][] }> => {
  return new Promise((resolve, reject) => {
    const inDegree = new Map();
    const graph: Map<string, string[]> = new Map();

    tasks.forEach((_task, key) => {
      _task.prevTasks = _task.prevTasks.sort();
      inDegree.set(key, 0);
      graph.set(key, []);
    });

    tasks.forEach((_, key) => {
      tasks.get(key)?.prevTasks.forEach((prevTask) => {
        const _task = tasks.get(prevTask);
        if (_task) {
          if (!_task.nextTasks.includes(key)) {
            _task.nextTasks.push(key);
            _task.nextTasks = _task.nextTasks.sort();
          }
          graph.get(prevTask)?.push(key);
          inDegree.set(key, inDegree.get(key) + 1);
        }
      });
    });

    const tasksDegree: string[][] = [];
    let zeroDegreTask: string[] = [];
    const inDegreeCopy = new Map(inDegree);
    const graphCopy: Map<string, string[]> = new Map(graph);

    const queue: string[] = [];
    const orderedTasks: string[] = [];
    inDegree.forEach((deg, task) => {
      if (deg === 0) queue.push(task);
    });

    zeroDegreTask = Array.from(queue);

    while (queue.length > 0) {
      const current: string = queue.shift() as string;
      orderedTasks.push(current);

      graph.get(current)?.forEach((nextTask) => {
        inDegree.set(nextTask, inDegree.get(nextTask) - 1);
        if (inDegree.get(nextTask) === 0) queue.push(nextTask);
      });
    }

    while (zeroDegreTask.length > 0) {
      tasksDegree.push(zeroDegreTask);
      const nextTasks: string[] = [];
      zeroDegreTask.forEach((current) => {
        graphCopy.get(current)?.forEach((nextTask) => {
          inDegreeCopy.set(nextTask, inDegreeCopy.get(nextTask) - 1);
          if (inDegreeCopy.get(nextTask) === 0) nextTasks.push(nextTask);
        });
      });
      zeroDegreTask = nextTasks;
    }
    console.log(tasksDegree);
    if (orderedTasks.length !== tasks.size) {
      reject("Impossible d'ordonner les tâches : dépendances circulaires détectées.");
    } else resolve({ orderedTasks, tasksDegree });
  });
};
