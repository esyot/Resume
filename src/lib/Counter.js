import { ref, watch } from "vue";

export function useCounter(targetValue, duration = 2000) {
  const displayValue = ref(0);

  const animate = (endValue) => {
    const start = displayValue.value;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - (1 - progress) * (1 - progress);

      displayValue.value = Math.floor(easeOut * (endValue - start) + start);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  watch(
    () => targetValue,
    (newVal) => {
      animate(newVal);
    },
    { immediate: true },
  );

  return { displayValue };
}
