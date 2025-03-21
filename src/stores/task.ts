import { initialTasks } from '@/assets/constant/task';
import type { Task } from '@/interface/Task';
import { handleOrderTasks } from '@/utils/orderTask';
import { MarkerType, type Edge, type Node } from '@vue-flow/core';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: initialTasks as Map<string, Task>,
    orderTasks: [] as string[],
    totalDuration: 0,
    nodes: [] as Node[],
    edges: [] as Edge[],
  }),

  actions: {
    addTask(id: string, data: Task) {
      this.tasks.set(id, data);
    },

    updateTask(id: string, data: Task) {
      this.addTask(id, data);
    },

    removeTask(id: string) {
      this.tasks.delete(id);
      this.tasks.forEach((task) => {
        task.prevTasks = task.prevTasks.filter((t) => t != id);
        task.nextTasks = task.nextTasks.filter((t) => t != id);
        if (!task.prevTasks.length) task.prevTasks.push('deb');
      });
    },

    setOrderTasks() {
      handleOrderTasks(this.tasks, this.orderTasks);
      this.orderTasks.push('fin');
      this.tasks.set('fin', {
        duration: 0,
        prevTasks: [],
        earlyDate: 0,
        lateDate: 0,
        nextTasks: [],
      });
      this.tasks.forEach((task, key) => {
        if ((!task.nextTasks.length && key != 'fin') || task.nextTasks.includes('fin'))
          this.tasks.get('fin')?.prevTasks.push(key);
      });
    },

    setEarlyDate() {
      let totalDuration = 0;
      this.orderTasks.forEach((key) => {
        const _task = this.tasks.get(key);
        _task?.prevTasks.forEach((keyTask) => {
          const _prevTask: Task = this.tasks.get(keyTask) as Task;
          if (_task.earlyDate <= _prevTask.earlyDate + _prevTask.duration) {
            _task.earlyDate = _prevTask.earlyDate + _prevTask.duration;
            if (totalDuration <= _task.earlyDate + _task.duration)
              totalDuration = _task.earlyDate + _task.duration;
          }
        });
      });
      const finTask = this.tasks.get('fin') as Task;
      finTask.earlyDate = totalDuration;
      finTask.lateDate = totalDuration;
      this.totalDuration = totalDuration;
    },

    setLateDate() {
      this.orderTasks.reverse();
      this.orderTasks.forEach((keyTask) => {
        if (keyTask != 'fin' && keyTask != 'deb') {
          const task = this.tasks.get(keyTask) as Task;
          if (!task.nextTasks.length) {
            const finTask = this.tasks.get('fin') as Task;
            task.lateDate = finTask.lateDate - task.duration;
          } else
            task.nextTasks.forEach((key) => {
              const nexTask = this.tasks.get(key) as Task;
              if (task.lateDate == 0 || task.lateDate >= nexTask.lateDate - task.duration) {
                task.lateDate = nexTask.lateDate - task.duration;
              }
            });
        }
      });
      this.orderTasks.reverse();
    },

    calculate() {
      this.resetData();
      this.setOrderTasks();
      this.setEarlyDate();
      this.setLateDate();
      this.setNodes_edges();
    },

    setNodes_edges() {
      const nodesData: {
        capacity: number;
        ids: string[];
        prev: string[];
        next: string[];
      }[] = [];

      this.nodes.push({
        id: 'deb',
        label: 'Deb',
        position: { x: 20, y: 400 },
        type: 'startNode',
      });
      let idNode = 0;
      const startTasks = this.tasks.get('deb')?.nextTasks;

      const ySpacing = 100; // Espacement vertical ajusté
      const levels: { [key: number]: number } = {}; // Stocker les niveaux verticaux

      this.orderTasks.forEach((id) => {
        if (id != 'deb' && !startTasks?.includes(id)) {
          const _task = this.tasks.get(id) as Task;

          const _nodeIndex = nodesData.findIndex(
            (value) =>
              value.capacity == _task.earlyDate &&
              (value.prev.join(',') == _task.prevTasks.join(',') ||
                (_task.nextTasks.length > 0 && value.next.join(',') == _task.nextTasks.join(','))),
          );

          if (_nodeIndex >= 0) {
            this.nodes[_nodeIndex + 1].data.lateStart.push({ id, value: _task.lateDate });
            nodesData[_nodeIndex].ids.push(id);
          } else {
            // Assurer une bonne répartition verticale
            if (!(_task.nextTasks.length in levels)) {
              levels[_task.nextTasks.length] = 400;
            }

            // Définir la position
            const nodeX = _task.earlyDate * 15; // Augmenter l'espacement horizontal
            const nodeY = levels[_task.nextTasks.length]; // Utiliser le niveau vertical calculé

            nodesData.push({
              capacity: _task.earlyDate,
              ids: [id],
              prev: _task.prevTasks,
              next: _task.nextTasks.filter((next) => next != 'fin'),
            });

            this.nodes.push({
              id: idNode.toString(),
              position: { x: nodeX, y: nodeY },
              data: {
                earlyStart: _task.earlyDate,
                lateStart: [{ id, value: _task.lateDate }],
              },
              type: id == 'fin' ? 'endNode' : 'stepNode', // Type personnalisé
            });
            idNode++;
          }
        }
      });
      const taskPrime: string[] = [];
      const tasksWithMultiNext = Array.from(
        new Map([...this.tasks].filter(([key, task]) => key != 'fin' && task.prevTasks.length > 1)),
        ([id, task]) => ({
          id,
          prevs: task.prevTasks,
        }),
      );
      tasksWithMultiNext.forEach((value) => {
        for (const prev of value.prevs) {
          if (!taskPrime.includes(prev)) {
            for (const [key, task] of this.tasks) {
              if (key !== value.id && task.prevTasks.includes(prev)) {
                const _task = this.tasks.get(prev) as Task;
                nodesData.push({
                  capacity: _task.earlyDate + _task.duration,
                  ids: [prev + "'"],
                  next: _task.nextTasks,
                  prev: [],
                });

                // Assurer une bonne répartition verticale
                if (!(_task.earlyDate in levels)) {
                  levels[_task.earlyDate] = 400;
                } else {
                  levels[_task.earlyDate] += ySpacing;
                }

                this.nodes.push({
                  id: prev + "'",
                  position: { x: _task.earlyDate * 15, y: levels[_task.earlyDate] }, // label: `${id}    plus tot: ${_task.earlyDate} plus tard: ${_task.lateDate}`,
                  data: {
                    earlyStart: _task.earlyDate + _task.duration,
                    lateStart: [{ id: prev + "'", value: _task.lateDate + _task.duration }],
                  },
                  type: 'stepNode', // Type personnalisé
                });
                taskPrime.push(prev);
                break;
              }
            }
          }
        }
      });

      // Création des arêtes (edges)
      [...this.tasks].forEach(([id, _task]) => {
        if (id !== 'deb' && id !== 'fin') {
          const source = startTasks?.includes(id)
            ? 'deb'
            : nodesData.findIndex((value) => value.ids.includes(id));
          const target = taskPrime.includes(id)
            ? id + "'"
            : nodesData.findIndex((value) => value.prev.includes(id));
          const color = _task.earlyDate === _task.lateDate ? '#dc2626' : '#262626';

          this.edges.push({
            id: source + '-' + target,
            source: source.toString(),
            target: target.toString(),
            label: `${_task?.name}  (${_task.duration})`, // Affichage du nom et durée sur l'edge
            style: {
              strokeWidth: 1.5,
              stroke: color,
            },
            labelStyle: {
              fill: color,
              fontSize: '14px',
            },

            markerEnd: {
              type: MarkerType.Arrow,
              color,
              strokeWidth: 2,
            },
          });
          if (taskPrime.includes(id)) {
            nodesData.some((value) => {
              if (value.ids.includes(id + "'")) {
                value.next.forEach((next) => {
                  const _target = nodesData.findIndex((value) => value.ids.includes(next));
                  const taskNext = this.tasks.get(next) as Task;
                  const _color =
                    taskNext.earlyDate === taskNext.lateDate && _task.earlyDate === _task.lateDate
                      ? '#dc2626'
                      : '#262626';
                  this.edges.push({
                    id: id + "'" + '-' + next,
                    source: id + "'",
                    target: _target.toString(),
                    label: '0',
                    style: {
                      strokeWidth: 1.5,
                      stroke: _color,
                    },
                    labelStyle: {
                      fill: _color,
                      fontSize: '14px',
                    },
                    markerEnd: {
                      type: MarkerType.Arrow,
                      color: _color,
                      strokeWidth: 2,
                    },
                  });
                });
              }
            });
          }
        }
      });
    },

    resetData() {
      this.nodes = [];
      this.edges = [];
      this.orderTasks = [];
      this.tasks.forEach((task) => {
        task.earlyDate = 0;
        task.lateDate = 0;
      });
    },
  },
  getters: {
    getPrevTasksName(state) {
      return (id: string) => {
        const _task = state.tasks.get(id) as Task;
        const _prevTasksName: string[] = [];
        if (_task.prevTasks.length < 1 || _task.prevTasks.includes('deb')) {
          return 'Début';
        }
        state.tasks.get(id)?.prevTasks.forEach((key) => {
          _prevTasksName.push(state.tasks.get(key)?.name as string);
        });
        return _prevTasksName.join(', ');
      };
    },
  },
});
