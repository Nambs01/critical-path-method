<template>
  <Dialog v-model:visible="props.visible" :closable="false" modal :style="{ width: '25rem' }">
    <template #header>
      <h3 class="p-dialog-title">
        {{ props.dataUpdated.isUpdate ? 'Modifier une tâche' : 'Nouvelle tâche' }}
      </h3>
    </template>
    <div class="form-controle">
      <label for="name">Nom*</label>
      <InputText
        v-model="data.name"
        id="name"
        class="flex-auto"
        autocomplete="off"
        @input="errorMessage.name = ''"
        :invalid="errorMessage.name.length > 0"
      />
      <Message v-if="errorMessage.name.length" severity="error" size="small" variant="simple">
        {{ errorMessage.name }}
      </Message>
    </div>
    <div class="form-controle">
      <label for="duration">Durée*</label>
      <InputNumber
        v-model="data.duration"
        id="duration"
        class="flex-auto"
        autocomplete="off"
        @input="errorMessage.duration = ''"
        :invalid="errorMessage.duration.length > 0"
      />
      <Message v-if="errorMessage.duration.length" severity="error" size="small" variant="simple">
        {{ errorMessage.duration }}
      </Message>
    </div>
    <div class="form-controle">
      <label for="prevTask">Tâche(s) antécédente(s)</label>
      <MultiSelect
        v-model="data.prevTasks"
        :options="optionTasks"
        option-label="task.name"
        option-value="id"
        filter
        class="w-full prev-task"
      />
    </div>
    <template #footer>
      <Button label="Annuler" severity="secondary" @click="cancel" autofocus />
      <Button
        :label="props.dataUpdated.isUpdate ? 'Enregistrer' : 'Ajouter'"
        severity="success"
        @click="submit()"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { Task } from '@/interface/Task';
import { useTaskStore } from '@/stores/task';
import { Dialog, InputText, InputNumber, Button, Message, MultiSelect } from 'primevue';
import { computed, onMounted, reactive, ref, watch, type Ref } from 'vue';

const props = defineProps<{
  visible: boolean;
  close: () => void;
  dataUpdated: {
    isUpdate: boolean;
    id: string;
    task: Task;
  };
}>();
const tasks: Ref = ref();
onMounted(() => {
  tasks.value = useTaskStore().tasks;
});

watch(
  () => props.dataUpdated.task.name,
  () => {
    data.name = props.dataUpdated.task.name;
    data.duration = props.dataUpdated.task.duration;
    data.prevTasks = props.dataUpdated.task.prevTasks;
  },
);
watch(
  () => props.dataUpdated.isUpdate,
  () => {
    if (!props.dataUpdated.isUpdate) clear();
    else {
      data.name = props.dataUpdated.task.name;
      data.duration = props.dataUpdated.task.duration;
      data.prevTasks = props.dataUpdated.task.prevTasks;
    }
  },
);
const data = reactive({
  name: props.dataUpdated.task.name,
  duration: props.dataUpdated.task.duration,
  prevTasks: props.dataUpdated.task.prevTasks,
});
const errorMessage = reactive({
  name: '',
  duration: '',
});
const optionTasks = computed(() => {
  return Array.from(
    new Map([...tasks.value].filter(([key]) => key != 'deb' && key != 'fin')),
    ([id, task]) => ({
      id,
      task,
    }),
  );
});

function clear() {
  errorMessage.duration = '';
  errorMessage.name = '';

  data.name = '';
  data.duration = 0;
  data.prevTasks = [];
}

function checkError() {
  if (data.name == '') errorMessage.name = 'Entrer le nom de la tâche svp !';
  if (Array.from(tasks.value.keys()).includes(data.name))
    errorMessage.name = "Changer le nom de la tâche , s'il vous plaît !";
  if (!data.duration || data.duration < 1)
    errorMessage.duration = "Entrer la durée de la tâche , s'il vous plaît !";
}

function addTaskSubmit() {
  useTaskStore().addTask(
    data.name as string,
    {
      ...data,
      lateDate: 0,
      earlyDate: 0,
      nextTasks: [],
    } as unknown as Task,
  );
  clear();
}

function updateTaskSubmit() {
  useTaskStore().updateTask(props.dataUpdated.id, {
    ...props.dataUpdated.task,
    ...data,
  });
}

function submit() {
  checkError();
  if (errorMessage.duration.length || errorMessage.name.length) return 0;
  if (props.dataUpdated.isUpdate) updateTaskSubmit();
  else addTaskSubmit();
  props.close();
}

function cancel() {
  props.close();
  if (!props.dataUpdated.isUpdate) clear();
}
</script>

<style lang="scss" scoped>
.p-dialog-header {
  h3 {
    width: 100%;
    text-align: center;
  }
}
.form-controle {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}
</style>
