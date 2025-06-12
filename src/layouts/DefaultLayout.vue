<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showScrollButton = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleScroll() {
  showScrollButton.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const contactInfo = {
  email: "rei.nhard3367@gmail.com",
  phone: "+63 (966) 867-4260",
  facebook: {
    url: "https://facebook.com/reinhard.esteban",
    label: "Facebook",
  },
  instagram: {
    url: "https://instagram.com/esyyyot",
    label: "Instagram",
  },
  linkedin: {
    url: "https://linkedin.com/in/reinhard-esteban",
    label: "LinkedIn",
  },
};

import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col relative">
    <Navbar />
    <div class="flex-1 overflow-auto select-none">
      <slot />
    </div>

    <button
      v-show="showScrollButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 text-black rounded-full cursor-pointer shadow-lg hover:bg-yellow-300 transition duration-300"
    >
      <i class="fas fa-circle-chevron-up fa-3x text-yellow-500 text-lg"></i>
    </button>

    <footer class="bg-black text-white py-6">
      <div class="space-y-4 mx-4">
        <ul class="flex sm:flex-row flex-col justify-around space-y-2 w-full">
          <li class="flex items-center space-x-3">
            <i class="freecon icon-envelope icon-lg"></i>
            <span>{{ contactInfo.email }}</span>
          </li>
          <li class="flex items-center space-x-3">
            <i class="freecon icon-phone icon-lg"></i>
            <span>{{ contactInfo.phone }}</span>
          </li>
          <li class="flex items-center space-x-3">
            <i class="freecon brand-facebook icon-lg"></i>
            <a
              :href="contactInfo.facebook.url"
              target="_blank"
              rel="noopener"
              class="hover:underline"
              >{{ contactInfo.facebook.label }}</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <i class="freecon brand-instagram icon-lg"></i>
            <a
              :href="contactInfo.instagram.url"
              target="_blank"
              rel="noopener"
              class="hover:underline"
              >{{ contactInfo.instagram.label }}</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <i class="freecon brand-linkedin icon-lg"></i>
            <a
              :href="contactInfo.linkedin.url"
              target="_blank"
              rel="noopener"
              class="hover:underline"
              >{{ contactInfo.linkedin.label }}</a
            >
          </li>
        </ul>
        <div class="flex justify-center text-xs text-gray-400 mt-4">
          &copy; {{ new Date().getFullYear() }} Reinhard Esteban. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
