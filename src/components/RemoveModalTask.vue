<template>
  <Dialog v-model:visible="props.visible" :closable="false" modal :style="{ width: '25rem' }">
    <div class="content">
      <p>
        Êtes-vous sûr de vouloir supprimer la tâche "{{ props.taskDeleted.name }}" ? Cette action
        est irréversible.
      </p>
      <div class="btn-groupe">
        <Button label="Annuler" severity="secondary" @click="props.close" autofocus />
        <Button label="Supprimer" severity="danger" @click="submit()" autofocus />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { Dialog, Button } from 'primevue';

const props = defineProps<{
  visible: boolean;
  close: () => void;
  taskDeleted: {
    id: string;
    name: string;
  };
}>();

function submit() {
  useTaskStore().removeTask(props.taskDeleted.id);
  props.close();
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  p {
    font-size: 16px;
  }
  .btn-groupe {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
