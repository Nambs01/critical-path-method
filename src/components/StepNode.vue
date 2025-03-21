<template>
  <div
    :class="{
      'vue-flow__node-custom': true,
      critical_path: isCriticalPath,
    }"
  >
    <div class="left">{{ data.earlyStart }}</div>
    <div class="ligne"></div>
    <div class="right">
      <template v-for="(lateStart, index) in data.lateStart" :key="index">
        <div
          :class="{
            item: true,
            'border-none': index == data.lateStart.length - 1,
          }"
        >
          {{ lateStart.value }}
        </div>
      </template>
    </div>
  </div>
  <Handle type="source" :position="Position.Right" />
  <Handle type="target" :position="Position.Left" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position } from '@vue-flow/core';
const { data } = defineProps(['data']) as {
  data: {
    earlyStart: number;
    lateStart: { id: string; value: number }[];
  };
};
const isCriticalPath = computed(() => {
  for (const lateStart of data.lateStart) {
    if (lateStart.value == data.earlyStart) return true;
  }
  return false;
});
</script>
<style lang="scss" scoped>
.vue-flow__node-custom {
  background: var(--color-background);
  color: #262626;
  border-radius: 50%;
  border: 1px solid #262626;
  min-height: 50px;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 1px 1fr;
  padding: 0;
  overflow: hidden;
  .ligne {
    background-color: #262626;
    height: 100%;
    margin: 0;
  }
  .left {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    color: #dc2626;
  }
  .right {
    padding: 10px 0;
    .item {
      border-bottom: 1px solid #262626;
      padding-left: 8px;
      color: #0ea5e9;
    }
    .border-none {
      border: none;
    }
  }
}
.critical_path {
  background-color: #e5e5e5 !important;
}
</style>
