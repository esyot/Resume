<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const typedText = ref("");
const dots = ref("");
onMounted(() => {
  const text =
    "Hi there! I'm Reinhard Esteban, and I'm a Web Developer. Click to get to know me";
  let index = 0;

  const type = () => {
    if (index < text.length) {
      typedText.value += text[index++];
      setTimeout(type, 50);
    } else {
      let dotCount = 0;
      setInterval(() => {
        dots.value = ".".repeat((dotCount = (dotCount + 1) % 4));
      }, 500);
    }
  };
  type();
});
</script>

<template>
  <div class="flex fixed inset-0 justify-center items-center z-50 bg-black">
    <img
      src="/assets/images/background.jpg"
      class="absolute inset-0 w-full h-full object-cover opacity-20"
      alt="background"
    />
    <RouterLink
      to="/home"
      class="relative hover:scale-90 transition-transform duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(255,255,255,1.0)]"
    >
      <div
        class="flex flex-col sm:flex-row items-center sm:items-start space-x-4 m-4 space-y-4 sm:space-y-0"
      >
        <img
          src="/assets/images/profile_img.jpg"
          class="p-1 bg-white h-24 w-24 sm:h-30 sm:w-30 rounded-full"
          alt="profile"
        />
        <div class="space-y-2 text-center sm:text-left">
          <h1 class="bg-white rounded-xl">
            <span class="block p-2 w-full sm:w-90 break-words">
              {{ typedText }} {{ dots }}
            </span>
          </h1>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
