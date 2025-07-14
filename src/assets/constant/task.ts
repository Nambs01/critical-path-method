import type { Task } from '@/interface/Task';

export const initialTasks: Map<string, Task> = new Map([
  ['deb', { duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['a', { duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['b', { duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['a'] }],
  ['c', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['b'] }],
  ['d', { duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['c'] }],
  ['e', { duration: 45, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['f', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['e'] }],
  ['g', { duration: 45, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['h', { duration: 60, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['d'] }],
  ['i', { duration: 20, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['h'] }],
  ['j', { duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['i'] }],
  ['k', { duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['f'] }],
  ['l', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['k'] }],
  [
    'm',
    {
      duration: 30,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['g', 'j', 'l'],
    },
  ],
  ['n', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['m'] }],
  ['o', { duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['n'] }],
  ['p', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['m'] }],
  ['q', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['o'] }],
  ['r', { duration: 15, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['q'] }],
  ['s', { duration: 30, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['q'] }],
  ['t', { duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['p'] }],
  [
    'u',
    { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['r', 't'] },
  ],
  [
    'v',
    { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['s', 't'] },
  ],
  [
    'w',
    { duration: 7, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['r', 's'] },
  ],
]);

export const taskMap1: Map<string, Task> = new Map([
  ['deb', { duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['A', { duration: 8, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['B', { duration: 12, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['C', { duration: 8, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A'] }],
  ['D', { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A'] }],
  ['E', { duration: 16, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A'] }],
  ['F', { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  [
    'G',
    { duration: 20, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['C', 'D'] },
  ],
  [
    'H',
    {
      duration: 16,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['E', 'F', 'G'],
    },
  ],
  [
    'I',
    { duration: 40, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['C', 'D'] },
  ],
  [
    'J',
    {
      duration: 20,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['E', 'F', 'G'],
    },
  ],
  [
    'K',
    {
      duration: 20,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['I', 'J', 'H'],
    },
  ],
  [
    'L',
    {
            duration: 24,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['I', 'J', 'H'],
    },
  ],
]);

export const taskMap2: Map<string, Task> = new Map([
  ['deb', { duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],
  ['A', { duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  [
    'B',
    { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['A', 'I'] },
  ],
  ['C', { duration: 1, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['B'] }],
  ['D', { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  [
    'E',
    { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['D', 'H'] },
  ],
  [
    'F',
    { duration: 5, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['E', 'I'] },
  ],
  ['G', { duration: 1, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['H', { duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['G'] }],
  ['I', { duration: 5, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['H'] }],
  ['J', { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['L'] }],
  [
    'K',
    { duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['I', 'J'] },
  ],
  ['L', { duration: 4, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['deb'] }],
  ['M', { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['I'] }],
  [
    'N',
    { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['M', 'T'] },
  ],
  [
    'O',
    {
      duration: 3,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['C', 'F', 'M'],
    },
  ],
  [
    'P',
    { duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['O'] },
  ],
  ['Q', { duration: 2, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['P'] }],
  [
    'R',
    {
      duration: 1,
      earlyDate: 0,
      lateDate: 0,
      nextTasks: [],
      prevTasks: ['K', 'N', 'O'],
    },
  ],
  ['S', { duration: 3, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['R'] }],
  ['T', { duration: 10, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: ['L'] }],
]);
