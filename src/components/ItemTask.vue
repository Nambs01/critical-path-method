<template>
  <div class="task-item">
    <p class="title">{{ task.name }}</p>
    <p>
      Durée: <span>{{ task.duration }} j</span> <br />
      Antécédent(s): <span> {{ taskStore.getPrevTasksName(id) }}</span>
    </p>
    <div class="btn-group">
      <Button
        icon="pi pi-pencil"
        rounded
        v-tooltip.top="'Modifier'"
        severity="info"
        variant="outlined"
        size="small"
        @click="emit('updateModalTask')"
      />
      <Button
        icon="pi pi-trash"
        rounded
        v-tooltip.top="'Supprimer'"
        severity="danger"
        size="small"
        @click="emit('removeModalTask')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/interface/Task';
import { useTaskStore } from '@/stores/task';
import { Button } from 'primevue';

const taskStore = useTaskStore();

const { id, task } = defineProps(['id', 'task']) as {
  id: string;
  task: Task;
};

const emit = defineEmits<{
  (event: 'updateModalTask'): void;
  (event: 'removeModalTask'): void;
}>();
</script>

<style lang="scss" scoped>
.task-item {
  margin-bottom: 3px;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  position: relative;
  &:hover {
    // background-color: hsla(160, 100%, 37%, 0.2);
    background-color: var(--color-background);
    .btn-group {
      visibility: visible;
    }
  }
  .title {
    font-weight: bold;
  }
  .btn-group {
    display: flex;
    visibility: hidden;
    position: absolute;
    top: 10px;
    right: 10px;
    gap: 5px;
    z-index: 1000;
    background-color: var(--color-background);
  }
}
</style>
