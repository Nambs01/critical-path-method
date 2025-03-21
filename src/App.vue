<script setup lang="ts">
import { Button } from 'primevue';
import TaskListView from './views/TaskListView.vue';
import TaskGraphView from './views/TaskGraphView.vue';
import { useTaskStore } from './stores/task';
import { ref, type Ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';

const edges: Ref<Edge[] | undefined> = ref();
const nodes: Ref<Node[] | undefined> = ref();
function generate() {
  useTaskStore().calculate();
  edges.value = useTaskStore().edges;
  nodes.value = useTaskStore().nodes;
}
</script>

<template>
  <header>
    <h1>Critical Path Method - CPM</h1>
    <Button label="Génerer" severity="success" @click="generate()" />
  </header>
  <main>
    <TaskListView />
    <TaskGraphView :nodes="nodes" :edges="edges" />
  </main>
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  height: 8vh;
  padding: 0 20px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-background-soft);
  .btn-validate {
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;
    background-color: hsla(160, 100%, 37%, 1);
  }
}
main {
  display: grid;
  grid-template-columns: 2fr 10fr;
  height: 92vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
