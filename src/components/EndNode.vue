<template>
  <div class="vue-flow__node-custom">
    <div class="capacity">{{ data.earlyStart }}</div>
    <div>Fin</div>
  </div>

  <Handle
    v-for="(idEdge, index) in data.edgesTarget"
    type="target"
    :key="idEdge"
    :id="handlePosition(index, data.edgesTarget.length)"
    :position="Position.Left"
    :connectable="false"
    /></template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import { handlePosition } from '@/utils/handle-position';

const { data } = defineProps(['data']) as {
  data: {
    edgesTarget: string[],
    earlyStart: number;
  };
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/vue-flow-handle.scss';
.vue-flow__node-custom {
  background-color: #e5e5e5 !important;
  color: #dc2626;
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
