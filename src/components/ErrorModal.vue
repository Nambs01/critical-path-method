<template>
  <Dialog v-model:visible="props.visible" :closable="false" modal :style="{ width: '25rem' }">
    <div class="content">
      <i class="pi pi-exclamation-circle" style="color: var(--p-orange-500); font-size: 6rem"></i>
      <p>{{ props.errorMessage }}</p>
      <div class="btn-groupe">
        <Button label="OK" @click="props.close" autofocus severity="warn" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, Button } from 'primevue';

const props = defineProps<{
  visible: boolean;
  close: () => void;
  errorMessage: string;
}>();
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  p {
    font-size: 16px;
    margin: 30px 0;
  }
}
</style>
