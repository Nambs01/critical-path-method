<template>
  <div class="task-graph">
    <VueFlow :nodes="nodes" :edges="edges">
      <template #node-startNode>
        <StartNode />
      </template>
      <template #node-endNode="{ data }">
        <EndNode :data="data" />
      </template>
      <template #node-stepNode="{ data }">
        <StepNode :data="data" />
      </template>
      <Background />
      <div class="total">
        Durée total du projet: <Counter :duration="2" :targetValue="useTaskStore().totalDuration" />
      </div>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import StepNode from '@/components/StepNode.vue';
import StartNode from '@/components/StartNode.vue';
import EndNode from '@/components/EndNode.vue';
import { useTaskStore } from '@/stores/task';
import Counter from '@/components/widget/Counter.vue';
const { nodes, edges } = defineProps(['nodes', 'edges']);
</script>

<style lang="scss" scoped>
.task-graph {
  // background-color: aqua;
  // height: 100vh;
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
}
.total {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #d1d5db;
  font-size: 14px;
  color: #000;
  border-radius: 5px;
  min-width: 215px;
}
</style>
