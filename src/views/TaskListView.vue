<template>
  <div class="task-list">
    <div class="header">
      <div class="left">
        <h2>Tâches</h2>
      </div>
      <Button label="Nouvelle Tâche" severity="success" @click="openModal(false)" />
    </div>
    <div class="content">
      <template :key="id" v-for="[id, task] in Array.from(taskStore.tasks)">
        <ItemTask
          v-if="id != 'deb' && id != 'fin'"
          :id="id"
          :task="task"
          @updateModalTask="openModal(true, id, task)"
          @removeModalTask="openRemoveModal(id, task.name as string)"
          :key="id"
        />
      </template>
    </div>
    <div v-if="!taskStore.tasks.size" class="task_not_found">Aucune tâche chargée</div>
  </div>
  <ModalTask :visible="isActiveModal" :close="closeModal" :dataUpdated="dataUpdated" />
  <RemoveModalTask
  :visible="showRemoveModal"
  :taskDeleted="taskDeleted"
  :close="closeRemoveModal"
  />
</template>

<script setup lang="ts">
import { initialTask } from '@/assets/constant/task';
import ItemTask from '@/components/ItemTask.vue';
import ModalTask from '@/components/ModalTask.vue';
import RemoveModalTask from '@/components/RemoveModalTask.vue';
import type { Task } from '@/interface/Task';
import { useTaskStore } from '@/stores/task';
import { Button } from 'primevue';
import { reactive, ref } from 'vue';

const isActiveModal = ref(false);
const showRemoveModal = ref(false);
const taskDeleted = reactive({
  id: '',
  name: '',
});
const taskStore = useTaskStore();
const dataUpdated = reactive({
  isUpdate: false,
  id: '',
  task: { ...initialTask } as Task,
});

function openModal(isUpdate: boolean, id?: string, task?: Task) {
  isActiveModal.value = true;
  dataUpdated.isUpdate = isUpdate;
  dataUpdated.id = id ? id : '';
  Object.assign(dataUpdated.task, task);
}

function closeModal() {
  isActiveModal.value = false;
}

function closeRemoveModal() {
  showRemoveModal.value = false;
}

function openRemoveModal(id: string, name: string) {
  showRemoveModal.value = true;
  taskDeleted.id = id;
  taskDeleted.name = name;
}
</script>

<style lang="scss" scoped>
.task-list {
  .task_not_found {
    margin-top: 100px;
    text-align: center;
  }
  padding: 0 10px 5px;
  // border-right: 1px solid gray;
  // background-color: gray;
  background-color: var(--color-background-mute);
  overflow-y: scroll;
  overflow-x: hidden;
  .header {
    position: sticky;
    top: 0;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    background-color: var(--color-background-mute);
    z-index: 1000;

    .btn-validate {
      padding: 5px 20px;
      border-radius: 5px;
      font-weight: bold;
      color: #fff;
      background-color: hsla(160, 100%, 37%, 1);
    }
  }
}
</style>
