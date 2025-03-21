<template>
  <div class="vue-flow__node-custom">
    <div class="capacity">{{ data.earlyStart }}</div>
    <div>Fin</div>
  </div>
  <Handle type="target" :position="Position.Left" />
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
const { data } = defineProps(['data']);
</script>

<style lang="scss" scoped>
.vue-flow__node-custom {
  background: var(--color-background);
  color: #262626;
  border-radius: 50%;
  border: 1px solid #262626;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;

  .capacity {
    position: absolute;
    top: -20px;
    color: #dc2626;
    font-size: 16px;
  }
}
</style>
