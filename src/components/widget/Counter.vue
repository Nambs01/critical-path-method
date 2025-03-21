<template>
  <span id="counter">{{ displayedValue }} j</span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ targetValue: number; duration: number }>();
const displayedValue = ref(0);

const animateCounter = () => {
  const startTime = performance.now();
  const endValue = props.targetValue;
  const duration = props.duration * 1000;

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    displayedValue.value = Math.round(progress * endValue);

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

watch(
  () => props.targetValue,
  () => {
    animateCounter();
  },
);
</script>
