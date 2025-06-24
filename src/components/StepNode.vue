<template>
  <div :class="{
    'vue-flow__node-custom': true,
    'critical_path': isCriticalPath,
  }">
  <div v-if="data.earlyStart === 0"
    :class="{
      'deb': true,
      'top': data.lateStart.length > 1,
    }"
  >
    Deb
  </div>
  <div 
    class="content"
    v-if="data.earlyStart !== 0 || data.lateStart.length > 1"
  >
    <template v-if="data.earlyStart != 0 || data.lateStart.length > 1">
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
    </template>
    </div>
  </div>

  <Handle
    v-for="(idEdge, index) in data.edgesSource"
    type="source"
    :key="idEdge"
    :id="handlePosition(index, data.edgesSource.length)"
    :position="Position.Right"
    :connectable="false"
    />

  <Handle
    v-for="(idEdge, index) in data.edgesTarget"
    type="target"
    :key="idEdge"
    :id="handlePosition(index, data.edgesTarget.length)"
    :position="Position.Left"
    :connectable="false"
    />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position } from '@vue-flow/core';
import { handlePosition } from '@/utils/handle-position';

const { data } = defineProps(['data']) as {
  data: {
    edgesSource: string[],
    edgesTarget: string[],
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
@use '@/assets/scss/vue-flow-handle.scss';
.vue-flow__node-custom {
  min-width: 70px;
  min-height: 50px;
  border-radius: 50%;
  border: 1px solid #262626;
  padding: 0;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .deb {
    color: #dc2626;
  }
  .top {
    position: absolute;
    top: -30px;
  }
  .content {
    color: #262626;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr 1px 1fr;
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
        padding: 0 20px 0 8px;
        color: #0ea5e9;
      }
      .border-none {
        border: none;
      }
    }
  }
}
.critical_path {
  background-color: #e5e5e5 !important;
}
</style>
