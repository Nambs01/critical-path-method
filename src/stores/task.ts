import { taskMap1, taskMap2, initialTasks } from '@/assets/constant/task';
import type { Task } from '@/interface/Task';
import { handlePosition } from '@/utils/handle-position';
import { handleOrderTasks } from '@/utils/orderTask';
import { MarkerType, type Edge, type Node } from '@vue-flow/core';
import { defineStore } from 'pinia';

const defaultData = [initialTasks, taskMap1, taskMap2];

export const useTaskStore = defineStore('task', {
  state: () => ({
    isUpdated: true,
    tasks: new Map([['deb', { duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [] as string[], prevTasks: [] as string[] }],]),
    orderedTasks: [] as string[],
    totalDuration: 0,
    nodes: [] as Node[],
    edges: [] as Edge[],
    tasksDegree: [] as string[][],
  }),

  actions: {
    async addTask(id: string, data: Task) {
      if(data.prevTasks.length < 1) data.prevTasks.push('deb');
      this.tasks.set(id, data);
      await this.resetData();
    },

    updateTask(id: string, data: Task) {
      this.addTask(id, data);
    },

    removeTask(id: string) {
      this.tasks.delete(id);
      this.tasks.forEach((task: Task) => {
        task.prevTasks = task.prevTasks.filter((t: string) => t != id);
        task.nextTasks = task.nextTasks.filter((t: string) => t != id);
        if (!task.prevTasks.length) task.prevTasks.push('deb');
      });
    },

    async setOrderedTasks() {
      await handleOrderTasks(this.tasks)
        .then((result) => {
          this.orderedTasks = result.orderedTasks;
          this.tasksDegree = result.tasksDegree;
          this.orderedTasks.push('fin');
          this.tasks.set('fin', {
            duration: 0,
            prevTasks: [],
            earlyDate: 0,
            lateDate: 0,
            nextTasks: [],
          });
          this.tasks.forEach((task: Task, key: string) => {
            if ((!task.nextTasks.length && key != 'fin') || task.nextTasks.includes('fin'))
              this.tasks.get('fin')?.prevTasks.push(key);
          });
        })
        .catch((error) => {
          throw error;
        });
    },

    async setEarlyDate() {
      let totalDuration = 0;
      this.orderedTasks.forEach((key: string) => {
        const _task = this.tasks.get(key);
        _task?.prevTasks.forEach((keyTask: string) => {
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

    async setLateDate() {
      this.orderedTasks.reverse();
      this.orderedTasks.forEach((keyTask: string) => {
        if (keyTask != 'fin' && keyTask != 'deb') {
          const task = this.tasks.get(keyTask) as Task;
          if (!task.nextTasks.length) {
            const finTask = this.tasks.get('fin') as Task;
            task.lateDate = finTask.lateDate - task.duration;
          } else
            task.nextTasks.forEach((key: string) => {
              const nexTask = this.tasks.get(key) as Task;
              if (task.lateDate == 0 || task.lateDate >= nexTask.lateDate - task.duration) {
                const nextTaskInit = this.tasks.get(task.nextTasks[0]) as Task;
                task.lateDate = nexTask.lateDate - task.duration;
                if (task.lateDate >= nextTaskInit.lateDate - task.duration) {
                  task.lateDate = nextTaskInit.lateDate - task.duration;
                  return;
                } 
              }
            });
        }
      });
      this.orderedTasks.reverse();
    },

    async calculate() {
      try {
        await this.resetData().then(async () => {
          await this.setOrderedTasks();
          await this.setEarlyDate();
          await this.setLateDate();
          await this.setNodes_edges();
        });

      } catch (error) {
        throw error;
      }
    },

    async setNodes_edges() {
      const nodesData: {
        capacity: number;
        isCriticalPath: boolean;
        ids: string[];
        prev: string[];
        next: string[];
      }[] = [];
      const taskPrime: string[] = [];

      this.orderedTasks.forEach((id, index) => {
        if (id != 'deb') {
          const _task = this.tasks.get(id) as Task;
          const _nodeIndex = nodesData.findIndex(
            (value) => value.prev.join(',') == _task.prevTasks.join(','),
          );

          if (_nodeIndex >= 0) {
            if (
              !this.nodes[_nodeIndex].data.lateStart.some((data: { id: string }) => data.id === id)
            ) {
              this.nodes[_nodeIndex].data.lateStart.push({ id, value: _task.lateDate });
              nodesData[_nodeIndex].ids.push(id);
              if (_task.earlyDate === _task.lateDate) nodesData[_nodeIndex].isCriticalPath = true;
            }
          } else {
            const isCriticalPath = _task.earlyDate === _task.lateDate;
            nodesData.push({
              capacity: _task.earlyDate,
              isCriticalPath,
              ids: [id],
              prev: _task.prevTasks,
              next: _task.nextTasks.filter((next) => next != 'fin'),
            });

            const nodeKey = _task.prevTasks.join(',');
            this.nodes.push({
              id: nodeKey,
              position: { x: 400, y: 400 },
              data: {
                edgesTarget: [],
                edgesSource: [],
                earlyStart: _task.earlyDate,
                lateStart: [{ id, value: _task.lateDate }],
              },
              type: id == 'fin' ? 'endNode' : 'stepNode', // Type personnalisé
            });
          }

          if (_task.nextTasks.length > 1) {
            _task.nextTasks.forEach((next) => {
              this.tasks.forEach((task, key) => {
                if (
                  key != id &&
                  task.nextTasks.includes(next) &&
                  task.nextTasks.join(',') != _task.nextTasks.join(',')
                ) {
                  if (!taskPrime.includes(id)) {
                    taskPrime.push(id);

                    const lateStartData: { id: string; value: number }[] = [];
                    _task.nextTasks.map((nextTask) => {
                      const _nextTask = this.tasks.get(nextTask) as Task;
                      lateStartData.push({ id: nextTask, value: _nextTask.lateDate });
                    });

                    const isCriticalPath = lateStartData.some(
                      (data) => data.value === _task.earlyDate + _task.duration,
                    );
                    nodesData.push({
                      capacity: _task.earlyDate + _task.duration,
                      isCriticalPath,
                      ids: [id + "'"],
                      next: _task.nextTasks,
                      prev: [id],
                    });

                    this.nodes.push({
                      id: id + "'",
                      position: { x: 400, y: 400 },
                      data: {
                        edgesTarget: [],
                        edgesSource: [],
                        earlyStart: _task.earlyDate + _task.duration,
                        lateStart: lateStartData,
                      },
                      type: 'stepNode', // Type personnalisé
                    });
                  }
                }
              });
            });
          }
        }
      });

      this.orderedTasks.forEach((id: string) => {
        // Ajouter une arête pour chaque tâche précédente
        if (id !== 'deb') {
          if (taskPrime.includes(id)) {
            const edgeTask = this.tasks.get(id) as Task;
            const source = edgeTask.prevTasks.length > 0 ? edgeTask.prevTasks.join(',') : 'deb';

            this.addCustomEdge({
              id,
              source: source,
              target: `${id}'`,
              label: `${id} (${edgeTask.duration})`,
              isCriticalPath: edgeTask.earlyDate === edgeTask.lateDate,
            });

            edgeTask.nextTasks.forEach((next) => {
              const nodePrime = nodesData.find((value) => value.ids.includes(`${id}'`));
              if (nodePrime && taskPrime.includes(next)) {
                const nextTask = this.tasks.get(next) as Task;
                const targetNode = nodesData.find((value) => value.ids.includes(`${next}'`));
                if (nextTask.prevTasks.length == 1 && targetNode) {
                  this.addCustomEdge({
                    id: '',
                    source: `${id}'`,
                    target: `${next}'`,
                    label: `${next} (${nextTask.duration})`,
                    isCriticalPath: nodePrime.isCriticalPath && targetNode.isCriticalPath,
                  });
                }
                if (nextTask.prevTasks.length > 1) {
                  const targetNode = nodesData.find((value) => value.prev.includes(next));
                  if (targetNode) {
                    this.addCustomEdge({
                      id: '',
                      source: `${id}'`,
                      target: nextTask.prevTasks.join(','),
                      label: '0',
                      isCriticalPath: nodePrime.isCriticalPath && targetNode.isCriticalPath,
                    });
                  }
                }
              } else {
                const targetNode = nodesData.find((value) => value.ids.includes(next));
                if (targetNode && nodePrime) {
                  this.addCustomEdge({
                    id: '',
                    source: `${id}'`,
                    target: targetNode.prev.join(','),
                    label: '0',
                    isCriticalPath: nodePrime.isCriticalPath && targetNode.isCriticalPath,
                  });
                }
              }
            });
          } else {
            const edgeTask = this.tasks.get(id) as Task;
            const source = edgeTask.prevTasks.length > 0 ? edgeTask.prevTasks.join(',') : 'deb';
            const target =
              nodesData.find((value) => value.prev.includes(id))?.prev.join(',') || 'fin';
            this.addCustomEdge({
              id,
              source,
              target,
              label: `${id} (${edgeTask.duration})`,
              isCriticalPath: edgeTask.earlyDate === edgeTask.lateDate,
            });
          }
        }
      });

      this.edges.forEach((edge) => {
        const sourceNode = this.nodes.find((node) => node.id === edge.source);
        const targetNode = this.nodes.find((node) => node.id === edge.target);

        if (sourceNode && targetNode) {
          const indexSource = sourceNode.data.edgesSource.findIndex(
            (handle: string) => handle === edge.id,
          );
          const indexTarget = targetNode.data.edgesTarget.findIndex(
            (handle: string) => handle === edge.id,
          );
          if (indexTarget > -1) {
            edge.sourceHandle = handlePosition(indexSource, sourceNode.data.edgesSource.length);
            edge.targetHandle = handlePosition(indexTarget, targetNode.data.edgesTarget.length);
          }
        }
      });

      // 1. Créer un dictionnaire de niveaux pour les tâches
      const taskLevelMap: Record<string, number> = {};
      this.tasksDegree.forEach((tasks, level) => {
        tasks.forEach((task) => (taskLevelMap[task] = level));
      });

      // 2. Calculer les positions
      const COLUMN_SPACING = 200;
      const ROW_SPACING = 175;
      const BASE_Y = 250;

      // 3. Organiser les nœuds par niveau
      const nodesByLevel: Record<number, Node[]> = {};

      this.nodes.forEach((node) => {
        let level = 0;

        if (node.id === 'deb') {
          level = 0;
        } else if (node.id === 'fin') {
          level = Math.max(...Object.values(taskLevelMap)) + 1;
        } else if (node.id.endsWith("'")) {
          // Nœud prime (fin de tâche)
          const baseTask = node.id.slice(0, -1);
          level = taskLevelMap[baseTask] + 1;
        } else {
          // Nœud standard
          const taskId = node.id.split(',')[0]; // Prendre la première tâche pour le niveau
          level = taskLevelMap[taskId] || 0;
        }

        if (!nodesByLevel[level]) nodesByLevel[level] = [];
        nodesByLevel[level].push(node);
      });

      // 4. Placer les nœuds
      Object.entries(nodesByLevel).forEach(([level, nodes]) => {
        const x = parseInt(level) * COLUMN_SPACING;

        nodes.forEach((node, index) => {
          node.position = {
            x,
            y: BASE_Y + index * ROW_SPACING,
          };
        });
      });

      // 5. Placement spécial pour 'fin' (dernière colonne)
      const finNode = this.nodes.find((n) => n.id === 'fin');
      if (finNode) {
        const maxLevel = Math.max(...Object.keys(nodesByLevel).map(Number));
        finNode.position = {
          x: (maxLevel + 1) * COLUMN_SPACING,
          y: BASE_Y,
        };
      }
    },

    addCustomEdge(param: {
      id: string;
      source: string;
      target: string;
      label: string;
      isCriticalPath: boolean;
      targethandle?: string;
    }) {
      const nodeSourceIndex = this.nodes.findIndex((node) => node.id === param.source);
      const nodeTargetIndex = this.nodes.findIndex((node) => node.id === param.target);

      if (nodeSourceIndex > -1 && nodeTargetIndex > -1) {
        const color = param.isCriticalPath ? '#dc2626' : '#262626';
        const id = param.source + '-' + param.target + '->' + param.id;

        this.nodes[nodeSourceIndex].data.edgesSource.push(id);
        this.nodes[nodeTargetIndex].data.edgesTarget.push(id);

        this.edges.push({
          ...param,
          id,
          targetHandle: id,
          sourceHandle: id,
          animated: param.label === '0',
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
      }
    },

    async resetData() {
      this.nodes = [];
      this.edges = [];
      this.orderedTasks = [];
      this.totalDuration = 0;
      this.tasks.forEach((task: Task) => {
        task.nextTasks = [];
        task.earlyDate = 0;
        task.lateDate = 0;
      });
    },

    setDefaultData(index: number | null) {
      if (index === null) {
        this.tasks = new Map([['deb', { duration: 0, earlyDate: 0, lateDate: 0, nextTasks: [], prevTasks: [] }],]);
      } else this.tasks = defaultData[index];
      this.resetData();
    },
  },
  getters: {
    getPrevTasksName(state) {
      return (id: string) => {
        const _task = state.tasks.get(id) as Task;
        if (_task.prevTasks.length < 1 || _task.prevTasks.includes('deb')) {
          return 'Début';
        }
        return state.tasks.get(id)?.prevTasks.join(', ');
      };
    },
  },
});
