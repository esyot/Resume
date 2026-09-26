<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref(null);
let ctx = null;
let animationFrame = null;

// Configuration
const SEGMENT_COUNT = 20; // Number of "joints" in the tail
const SMOOTHNESS = 0.16; // Lower is more "liquid", Higher is more "stiff"
const TAIL_COLOR = "#d4af37"; // Your brand gold

const mouse = { x: 0, y: 0 };
const points = [];

// Initialize segments at 0,0
for (let i = 0; i < SEGMENT_COUNT; i++) {
  points.push({ x: 0, y: 0 });
}

const updateMouse = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const resize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
};

const draw = () => {
  if (!ctx || !canvasRef.value) return;

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  // 1. Update the head to follow mouse
  points[0].x = mouse.x;
  points[0].y = mouse.y;

  // 2. Update trailing segments using Lerp
  for (let i = 1; i < SEGMENT_COUNT; i++) {
    points[i].x += (points[i - 1].x - points[i].x) * SMOOTHNESS;
    points[i].y += (points[i - 1].y - points[i].y) * SMOOTHNESS;
  }

  // 3. Render the tail segments
  for (let i = 0; i < SEGMENT_COUNT - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    // Dynamic styling based on position in the tail
    const size = (SEGMENT_COUNT - i) * 0.8; // Gets thinner
    const opacity = (SEGMENT_COUNT - i) / SEGMENT_COUNT; // Fades out

    ctx.strokeStyle = TAIL_COLOR;
    ctx.lineWidth = size;
    ctx.globalAlpha = opacity * 0.6; // Base transparency
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Subtle glow for the "lead" segments
    if (i < 5) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = TAIL_COLOR;
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.stroke();
  }

  animationFrame = requestAnimationFrame(draw);
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  window.addEventListener("mousemove", updateMouse);
  window.addEventListener("resize", resize);
  resize();
  draw();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
  window.removeEventListener("resize", resize);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <!-- z-[9999] keeps it on top, pointer-events-none makes it "ghost" -->
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen hidden sm:flex"
  ></canvas>
</template>

<style scoped>
/* Ensure the canvas doesn't cause scrolling */
canvas {
  backface-visibility: hidden;
}
</style>
