<script setup>
import { useCounter } from "../lib/Counter";

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
});

const { displayValue } = useCounter(props.value, props.duration);
</script>

<template>
  <span>{{ displayValue }}+</span>
</template>
