import type { Task } from '@/interface/Task';

export const initialTask = {
  name: 'Debut',
  duration: 0,
  prevTasks: [],
  earlyDate: 0,
  lateDate: 0,
  nextTasks: [],
} as Task;

export const initialTasks: Map<string, Task> = new Map();
initialTasks
  .set('deb', {
    name: '',
    duration: 0,
    prevTasks: [],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('a', {
    name: 'A',
    duration: 7,
    prevTasks: ['deb'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('b', {
    name: 'B',
    duration: 7,
    prevTasks: ['a'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('c', {
    name: 'C',
    duration: 15,
    prevTasks: ['b'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('d', {
    name: 'D',
    duration: 30,
    prevTasks: ['c'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('e', {
    name: 'E',
    duration: 45,
    prevTasks: ['d'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('f', {
    name: 'F',
    duration: 15,
    prevTasks: ['e'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('g', {
    name: 'G',
    duration: 45,
    prevTasks: ['d'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('h', {
    name: 'H',
    duration: 60,
    prevTasks: ['d'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('i', {
    name: 'I',
    duration: 20,
    prevTasks: ['h'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('j', {
    name: 'J',
    duration: 30,
    prevTasks: ['i'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('k', {
    name: 'K',
    duration: 30,
    prevTasks: ['f'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('l', {
    name: 'L',
    duration: 15,
    prevTasks: ['k'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('m', {
    name: 'M',
    duration: 30,
    prevTasks: ['g', 'j', 'l'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('n', {
    name: 'N',
    duration: 15,
    prevTasks: ['m'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('o', {
    name: 'O',
    duration: 30,
    prevTasks: ['n'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('p', {
    name: 'P',
    duration: 15,
    prevTasks: ['m'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('q', {
    name: 'Q',
    duration: 15,
    prevTasks: ['o'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('r', {
    name: 'R',
    duration: 15,
    prevTasks: ['q'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('s', {
    name: 'S',
    duration: 30,
    prevTasks: ['q'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('t', {
    name: 'T',
    duration: 7,
    prevTasks: ['p'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('u', {
    name: 'U',
    duration: 4,
    prevTasks: ['r', 't'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('v', {
    name: 'V',
    duration: 2,
    prevTasks: ['s', 't'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  })
  .set('w', {
    name: 'W',
    duration: 7,
    prevTasks: ['r', 's'],
    earlyDate: 0,
    lateDate: 0,
    nextTasks: [],
  });
