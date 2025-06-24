import type { Task } from '@/interface/Task';

export const initialTask = {
  name: 'Debut',
  duration: 0,
  prevTasks: [],
  earlyDate: 0,
  lateDate: 0,
  nextTasks: [],
} as Task;

export const initialTasks: Map<string, Task> = new Map([
  ['deb', { name: '', duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['a', { name: 'A', duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['b', { name: 'B', duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['a'] }],
  ['c', { name: 'C', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['b'] }],
  ['d', { name: 'D', duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['c'] }],
  ['e', { name: 'E', duration: 45, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['f', { name: 'F', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['e'] }],
  ['g', { name: 'G', duration: 45, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['h', { name: 'H', duration: 60, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['i', { name: 'I', duration: 20, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['h'] }],
  ['j', { name: 'J', duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['i'] }],
  ['k', { name: 'K', duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['f'] }],
  ['l', { name: 'L', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['k'] }],
  [
    'm',
    {
      name: 'M',
      duration: 30,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['g', 'j', 'l'],
    },
  ],
  ['n', { name: 'N', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['m'] }],
  ['o', { name: 'O', duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['n'] }],
  ['p', { name: 'P', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['m'] }],
  ['q', { name: 'Q', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['o'] }],
  ['r', { name: 'R', duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['q'] }],
  ['s', { name: 'S', duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['q'] }],
  ['t', { name: 'T', duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['p'] }],
  [
    'u',
    { name: 'U', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['r', 't'] },
  ],
  [
    'v',
    { name: 'V', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['s', 't'] },
  ],
  [
    'w',
    { name: 'W', duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['r', 's'] },
  ],
]);

export const taskMap1: Map<string, Task> = new Map([
  ['deb', { name: '', duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['A', { name: 'A', duration: 8, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['B', { name: 'B', duration: 12, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A'] }],
  ['C', { name: 'C', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  ['D', { name: 'D', duration: 8, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  ['E', { name: 'E', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  ['F', { name: 'F', duration: 8, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  [
    'G',
    { name: 'G', duration: 24, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['C', 'D'] },
  ],
  [
    'H',
    {
      name: 'H',
      duration: 20,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['E', 'F', 'G'],
    },
  ],
  [
    'I',
    { name: 'I', duration: 12, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['C', 'D'] },
  ],
  [
    'J',
    {
      name: 'J',
      duration: 16,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['E', 'F', 'G'],
    },
  ],
  [
    'K',
    {
      name: 'K',
      duration: 32,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['I', 'J', 'H'],
    },
  ],
  [
    'L',
    {
      name: 'L',
      duration: 36,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['I', 'J', 'H'],
    },
  ],
]);

export const taskMap2: Map<string, Task> = new Map([
  ['deb', { name: '', duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['A', { name: 'A', duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  [
    'B',
    { name: 'B', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A', 'I'] },
  ],
  ['C', { name: 'C', duration: 1, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  ['D', { name: 'D', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  [
    'E',
    { name: 'E', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['D', 'H'] },
  ],
  [
    'F',
    { name: 'F', duration: 5, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['E', 'I'] },
  ],
  ['G', { name: 'G', duration: 1, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['H', { name: 'H', duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['G'] }],
  ['I', { name: 'I', duration: 5, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['H'] }],
  ['J', { name: 'J', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['L'] }],
  [
    'K',
    { name: 'K', duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['I', 'J'] },
  ],
  ['L', { name: 'L', duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['M', { name: 'M', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['I'] }],
  [
    'N',
    { name: 'N', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['M', 'T'] },
  ],
  [
    'O',
    {
      name: 'O',
      duration: 3,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['C', 'F', 'M'],
    },
  ],
  [
    'P',
    { name: 'P', duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['N', 'O'] },
  ],
  ['Q', { name: 'Q', duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['P'] }],
  [
    'R',
    {
      name: 'R',
      duration: 1,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['K', 'N', 'O'],
    },
  ],
  ['S', { name: 'S', duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['R'] }],
  ['T', { name: 'T', duration: 10, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['L'] }],
]);
