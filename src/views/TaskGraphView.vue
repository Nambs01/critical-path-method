<template>
  <div class="task-graph">
    <VueFlow :nodes="nodes" :edges="edges">
      <template #node-endNode="{ data }">
        <EndNode :data="data" />
      </template>
      <template #node-stepNode="{ data }">
        <StepNode :data="data" />
      </template>
      <Background />
      <div class="total">
        Durée total du projet: <Counter :duration="2" :targetValue="totalDuration" />
      </div>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { VueFlow, type Edge, type Node } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import StepNode from '@/components/StepNode.vue';
import EndNode from '@/components/EndNode.vue';
import Counter from '@/components/widget/Counter.vue';

const { nodes, edges, totalDuration } = defineProps(['nodes', 'edges', 'totalDuration']) as {
  nodes: Node[];
  edges: Edge[];
  totalDuration: number;
};
</script>

<style lang="scss" scoped>
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
