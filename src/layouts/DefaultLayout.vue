<template>
  <div id="app" class="min-h-screen flex flex-col relative">
    <nav class="sticky top-0 bg-black select-none z-10">
      <div class="md:hidden flex items-center p-4 text-white">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <ul
        :class="{ hidden: !menuOpen, 'md:flex': true }"
        class="md:flex space-x-8 p-4 text-white font-bold sm:space-y-0 space-y-4"
      >
        <li>
          <router-link
            to="/home"
            title="Click to proceed to home page."
            class="hover:opacity-50"
            active-class="text-yellow-400"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/contact"
            title="Click to proceed to contact information page."
            class="hover:opacity-50"
            active-class="text-yellow-400"
            >Contact</router-link
          >
        </li>
      </ul>
    </nav>

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
        <div class="text-lg font-semibold">Contact Information</div>
        <ul class="space-y-2 w-full">
          <li class="flex items-center space-x-3">
            <i class="fas fa-envelope text-gray-400 text-xl w-6"></i>
            <span>{{ contactInfo.email }}</span>
          </li>
          <li class="flex items-center space-x-3">
            <i class="fas fa-phone text-green-400 text-xl w-6"></i>
            <span>{{ contactInfo.phone }}</span>
          </li>
          <li class="flex items-center space-x-3">
            <i class="fab fa-facebook text-blue-500 text-xl w-6"></i>
            <a
              :href="contactInfo.facebook.url"
              target="_blank"
              rel="noopener"
              class="hover:underline"
              >{{ contactInfo.facebook.label }}</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <i class="fab fa-instagram text-pink-400 text-xl w-6"></i>
            <a
              :href="contactInfo.instagram.url"
              target="_blank"
              rel="noopener"
              class="hover:underline"
              >{{ contactInfo.instagram.label }}</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <i class="fab fa-linkedin text-blue-400 text-xl w-6"></i>
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
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const menuOpen = ref(false);
const showScrollButton = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

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
</script>
